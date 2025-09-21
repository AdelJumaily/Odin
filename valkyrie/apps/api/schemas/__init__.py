"""Pydantic schemas used by the API."""
from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr

from ..models import ApiKeyScope, IngestStatus, UserRole


class UserBase(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str]
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    full_name: Optional[str]
    password: str
    role: UserRole = UserRole.viewer


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class MagicLinkRequest(BaseModel):
    email: EmailStr


class ProjectBase(BaseModel):
    id: str
    name: str
    description: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True


class ProjectCreate(BaseModel):
    name: str
    description: Optional[str]


class ApiKeyOut(BaseModel):
    id: int
    label: str
    token: str
    scopes: List[str]
    expires_at: Optional[datetime]
    created_at: datetime

    class Config:
        orm_mode = True


class ApiKeyCreate(BaseModel):
    label: str
    scopes: List[ApiKeyScope]
    expires_at: Optional[datetime]


class DocumentOut(BaseModel):
    id: str
    project_id: str
    title: str
    source: str
    mime_type: Optional[str]
    size_bytes: Optional[int]
    attributes: Optional[dict]
    created_at: datetime

    class Config:
        orm_mode = True


class IngestJobOut(BaseModel):
    id: int
    project_id: str
    document_id: Optional[str]
    status: IngestStatus
    error_message: Optional[str]
    created_at: datetime
    finished_at: Optional[datetime]

    class Config:
        orm_mode = True


class IngestResponse(BaseModel):
    document: DocumentOut
    job: IngestJobOut


class SearchResultChunk(BaseModel):
    document_id: str
    chunk_index: int
    content: str
    score: float
    source: Optional[str]


class SearchResponse(BaseModel):
    query: str
    mode: str
    chunks: List[SearchResultChunk]


class GraphNode(BaseModel):
    canonical_name: str
    entity_type: Optional[str]
    attributes: Optional[dict]


class GraphEdge(BaseModel):
    source: str
    target: str
    relation_type: str
    attributes: Optional[dict]


class GraphResponse(BaseModel):
    root: str
    nodes: List[GraphNode]
    edges: List[GraphEdge]


class ApiKeyRotateRequest(BaseModel):
    expires_at: Optional[datetime]


class DocumentUploadResponse(BaseModel):
    document_id: str
    job_id: int


class ApiKeyListResponse(BaseModel):
    items: List[ApiKeyOut]


class ProjectListResponse(BaseModel):
    items: List[ProjectBase]


class DocumentListResponse(BaseModel):
    items: List[DocumentOut]


class UserListResponse(BaseModel):
    items: List[UserBase]
