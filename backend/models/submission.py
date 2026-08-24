from datetime import datetime

from extensions import db


class Submission(db.Model):
    __tablename__ = "submissions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    problem_id = db.Column(
        db.Integer,
        db.ForeignKey("problems.id"),
        nullable=False,
        index=True
    )

    score = db.Column(
        db.Float,
        nullable=False,
        default=0
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="attempted"
    )

    submitted_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    user = db.relationship(
        "User",
        back_populates="submissions"
    )

    problem = db.relationship(
        "Problem",
        back_populates="submissions"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "problem_id": self.problem_id,
            "score": self.score,
            "status": self.status,
            "submitted_at": self.submitted_at,
        }