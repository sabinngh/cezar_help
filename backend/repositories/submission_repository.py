from extensions import db
from models.submission import Submission


class SubmissionRepository:

    @staticmethod
    def create(submission):
        db.session.add(submission)
        db.session.commit()

        return submission


    @staticmethod
    def get_by_user(user_id):
        return (
            Submission.query
            .filter_by(user_id=user_id)
            .order_by(Submission.submitted_at.desc())
            .all()
        )


    @staticmethod
    def get_by_problem(problem_id):
        return (
            Submission.query
            .filter_by(problem_id=problem_id)
            .order_by(Submission.submitted_at.desc())
            .all()
        )


    @staticmethod
    def get_user_problem_submissions(
        user_id,
        problem_id
    ):
        return (
            Submission.query
            .filter_by(
                user_id=user_id,
                problem_id=problem_id
            )
            .order_by(Submission.submitted_at.desc())
            .all()
        )


    @staticmethod
    def get_all():
        return Submission.query.all()