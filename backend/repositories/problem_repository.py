from extensions import db
from models.problem import Problem


class ProblemRepository:

    @staticmethod
    def create(
        title,
        slug,
        difficulty,
        short_description,
        content,
        filename,
        created_by
    ):
        problem = Problem(
            title=title,
            slug=slug,
            difficulty=difficulty,
            short_description=short_description,
            content=content,
            original_filename=filename,
            created_by=created_by
        )

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
        return Problem.query.filter_by(
            slug=slug
        ).first()

    @staticmethod
    def delete(problem):
        db.session.delete(problem)
        db.session.commit()