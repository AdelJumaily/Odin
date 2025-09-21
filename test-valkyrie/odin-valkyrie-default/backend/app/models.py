from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Text, Integer, TIMESTAMP, func, ForeignKey

class Base(DeclarativeBase): pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(Text)
    api_key: Mapped[str] = mapped_column(Text, unique=True)
    role: Mapped[str] = mapped_column(Text)  # ceo/admin/editor/viewer/intern

class Project(Base):
    __tablename__ = "projects"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(Text, unique=True)

class ProjectMembership(Base):
    __tablename__ = "project_membership"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"))

class Document(Base):
    __tablename__ = "documents"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    filename: Mapped[str] = mapped_column(Text)
    path_enc: Mapped[str] = mapped_column(Text)      # ciphertext path
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="SET NULL"))
    owner_user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"))
    mime: Mapped[str] = mapped_column(Text)
    size_bytes: Mapped[int] = mapped_column(Integer)
    sha512: Mapped[str] = mapped_column(Text)        # plaintext integrity hash
    nonce_b64: Mapped[str] = mapped_column(Text)     # AES-GCM nonce
    created_at: Mapped[str] = mapped_column(TIMESTAMP, server_default=func.now())
