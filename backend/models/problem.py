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

    statement = db.Column(
        db.Text,
        nullable=False
    )

    input_description = db.Column(
        db.Text
    )

    output_description = db.Column(
        db.Text
    )

    constraints = db.Column(
        db.Text
    )

    examples = db.Column(
        db.Text
    )

    evaluation = db.Column(
        db.Text
    )

    hints = db.Column(
        db.Text
    )

    resource_link = db.Column(
        db.String(500)
    )

    image_url = db.Column(
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

    def to_dict(self):

        return {

            "id": self.id,

            "title": self.title,

            "slug": self.slug,

            "difficulty": self.difficulty,

            "short_description": self.short_description,

            "statement": self.statement,

            "input_description": self.input_description,

            "output_description": self.output_description,

            "constraints": self.constraints,

            "examples": self.examples,

            "evaluation": self.evaluation,

            "hints": self.hints,

            "resource_link": self.resource_link,

            "image_url": self.image_url,

            "created_at": self.created_at,

            "updated_at": self.updated_at,

            "created_by": self.created_by,

            "author": {

                "id": self.author.id,

                "username": self.author.username

            } if self.author else None

        }