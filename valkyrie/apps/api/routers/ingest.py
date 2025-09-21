import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from .. import schemas
from ..config import Settings
from ..deps import (
    get_db,
    get_optional_api_key,
    get_optional_user,
    get_settings_dependency,
)
from ..models import ApiKey, ApiKeyScope, Document, IngestJob, IngestStatus, Project, ProjectMembership, User, UserRole
from ..services.ingest import enqueue_ingest

router = APIRouter(prefix="/ingest", tags=["ingest"])


def _ensure_user_membership(db: Session, project_id: str, user: User) -> None:
    membership = (
        db.query(ProjectMembership)
        .filter(ProjectMembership.project_id == project_id, ProjectMembership.user_id == user.id)
        .one_or_none()
    )
    if not membership or membership.role not in {UserRole.owner, UserRole.maintainer, UserRole.ingestor}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role for ingestion")


def _ensure_api_key(api_key: ApiKey, project_id: str) -> None:
    if str(api_key.project_id) != project_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="API key scoped to different project")
    if ApiKeyScope.ingest_write.value not in api_key.scopes and ApiKeyScope.admin.value not in api_key.scopes:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="API key missing ingest scope")


@router.post("/projects/{project_id}", response_model=schemas.DocumentUploadResponse)
async def upload_document(
    project_id: str,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings_dependency),
    current_user: User | None = Depends(get_optional_user),
    api_key: ApiKey | None = Depends(get_optional_api_key),
):
    if not current_user and not api_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    if current_user:
        _ensure_user_membership(db, project_id, current_user)
    if api_key:
        _ensure_api_key(api_key, project_id)

    data = await file.read()
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty file")
    dest_dir = settings.storage_path / project_id
    dest_dir.mkdir(parents=True, exist_ok=True)
    document_id = uuid.uuid4()
    dest_path = dest_dir / f"{document_id}_{file.filename}"
    dest_path.write_bytes(data)

    document = Document(
        id=document_id,
        project_id=project.id,
        title=file.filename or dest_path.name,
        source="upload",
        storage_path=str(dest_path),
        mime_type=file.content_type,
        size_bytes=len(data),
        created_by_id=current_user.id if current_user else None,
    )
    db.add(document)
    db.flush()
    job = IngestJob(
        project_id=project.id,
        document_id=document.id,
        status=IngestStatus.pending,
        payload={"filename": file.filename},
    )
    db.add(job)
    db.flush()

    background_tasks.add_task(enqueue_ingest, job.id)

    return schemas.DocumentUploadResponse(document_id=str(document.id), job_id=job.id)

