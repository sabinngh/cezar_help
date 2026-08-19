from extensions import db
from models.problem import Problem


class ProblemRepository:

    @staticmethod
    def create(problem):
        db.session.add(problem)
        db.session.commit()
        return problem

    @staticmethod
    def get_all():
        return (
            Problem.query
            .order_by(Problem.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_slug(slug):
        return Problem.query.filter_by(slug=slug).first()

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def delete(problem):
        db.session.delete(problem)
        db.session.commit()