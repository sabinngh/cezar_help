from models.submission import Submission
from models.problem import Problem
from repositories.submission_repository import SubmissionRepository


class SubmissionService:

    @staticmethod
    def create_submission(
        user_id,
        problem_id,
        score
    ):

        problem = Problem.query.get(problem_id)

        if not problem:
            return None, "Problem not found."

        try:
            score = float(score)
        except (TypeError, ValueError):
            return None, "Invalid score."

        if score < 0 or score > 100:
            return None, "Score must be between 0 and 100."

        if score == 100:
            status = "solved"

        elif score > 0:
            status = "partial"

        else:
            status = "attempted"

        submission = Submission(
            user_id=int(user_id),
            problem_id=problem_id,
            score=score,
            status=status
        )

        submission = SubmissionRepository.create(
            submission
        )

        return submission, None