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

    notebook_file = db.Column(
        db.String(255)
    )

    starter_archive = db.Column(
        db.String(255)
    )

    ground_truth_file = db.Column(
        db.String(255)
    )

    image_url = db.Column(
        db.String(500)
    )

    resource_link = db.Column(
        db.String(500)
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

            "notebook_file": self.notebook_file,

            "starter_archive": self.starter_archive,

            "ground_truth_file": self.ground_truth_file,

            "image_url": self.image_url,

            "resource_link": self.resource_link,

            "created_at": self.created_at,

            "updated_at": self.updated_at,

            "created_by": self.created_by,

            "author": {

                "id": self.author.id,

                "username": self.author.username

            } if self.author else None

        }