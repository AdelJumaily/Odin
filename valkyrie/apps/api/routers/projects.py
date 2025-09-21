import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..deps import get_current_user, get_db, require_project_role
from ..models import ApiKey, Project, ProjectMembership, User, UserRole
from ..security import generate_api_key_token

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("/", response_model=schemas.ProjectListResponse)
async def list_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    memberships = (
        db.query(ProjectMembership)
        .filter(ProjectMembership.user_id == current_user.id)
        .all()
    )
    project_ids = [membership.project_id for membership in memberships]
    if not project_ids:
        return schemas.ProjectListResponse(items=[])
    projects = db.query(Project).filter(Project.id.in_(project_ids)).all()
    return schemas.ProjectListResponse(items=projects)


@router.post("/", response_model=schemas.ProjectBase, status_code=status.HTTP_201_CREATED)
async def create_project(
    payload: schemas.ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if current_user.role not in {UserRole.owner, UserRole.maintainer}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role")
    existing = db.query(Project).filter(Project.name == payload.name).one_or_none()
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Project exists")
    project = Project(name=payload.name, description=payload.description)
    db.add(project)
    db.flush()
    membership = ProjectMembership(project_id=project.id, user_id=current_user.id, role=UserRole.owner)
    db.add(membership)
    return project


@router.get("/{project_id}", response_model=schemas.ProjectBase)
async def get_project(project: Project = Depends(require_project_role())):
    return project


@router.get("/{project_id}/api-keys", response_model=schemas.ApiKeyListResponse)
async def list_api_keys(
    project: Project = Depends(require_project_role(UserRole.maintainer, UserRole.owner)),
    db: Session = Depends(get_db),
):
    keys = db.query(ApiKey).filter(ApiKey.project_id == project.id).order_by(ApiKey.created_at.desc()).all()
    return schemas.ApiKeyListResponse(items=keys)


@router.post("/{project_id}/api-keys", response_model=schemas.ApiKeyOut, status_code=status.HTTP_201_CREATED)
async def create_api_key(
    payload: schemas.ApiKeyCreate,
    project: Project = Depends(require_project_role(UserRole.maintainer, UserRole.owner)),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    token = generate_api_key_token()
    api_key = ApiKey(
        token=token,
        label=payload.label,
        scopes=[scope.value for scope in payload.scopes],
        project_id=project.id,
        user_id=current_user.id,
        expires_at=payload.expires_at,
    )
    db.add(api_key)
    db.flush()
    return api_key


@router.delete("/{project_id}/api-keys/{api_key_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_api_key(
    api_key_id: int,
    project: Project = Depends(require_project_role(UserRole.maintainer, UserRole.owner)),
    db: Session = Depends(get_db),
):
    api_key = db.query(ApiKey).filter(ApiKey.id == api_key_id, ApiKey.project_id == project.id).one_or_none()
    if not api_key:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API key not found")
    db.delete(api_key)
    return None


@router.get("/{project_id}/documents", response_model=schemas.DocumentListResponse)
async def list_documents(
    project: Project = Depends(require_project_role()),
    db: Session = Depends(get_db),
):
    documents = project.documents
    return schemas.DocumentListResponse(items=documents)
