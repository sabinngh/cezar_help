from datetime import datetime

from extensions import db


class Problem(db.Model):

    __tablename__ = "problems"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(255),
        nullable=False
    )

    slug = db.Column(
        db.String(255),
        unique=True,
        nullable=False
    )

    difficulty = db.Column(
        db.String(20),
        nullable=False
    )

    short_description = db.Column(
        db.String(500),
        nullable=False
    )

    content = db.Column(
        db.Text,
        nullable=False
    )

    original_filename = db.Column(
        db.String(255),
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    created_by = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    submissions = db.relationship(
        "Submission",
        back_populates="problem",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def to_dict(self):

        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "difficulty": self.difficulty,
            "short_description": self.short_description,
            "content": self.content,
            "original_filename": self.original_filename,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
            "updated_at": (
                self.updated_at.isoformat()
                if self.updated_at
                else None
            ),
            "created_by": self.created_by,
            "author": {
                "id": self.author.id,
                "username": self.author.username
            } if self.author else None
        }