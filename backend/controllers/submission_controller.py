from flask import Blueprint, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.submission_service import SubmissionService
from repositories.submission_repository import SubmissionRepository


submission_bp = Blueprint(
    "submission",
    __name__
)


@submission_bp.route(
    "/api/submissions",
    methods=["POST"]
)
@jwt_required()
def create_submission():

    user_id = get_jwt_identity()

    data = request.get_json()

    problem_id = data.get("problem_id")
    score = data.get("score")

    if problem_id is None:
        return {
            "message": "problem_id is required."
        }, 400

    if score is None:
        return {
            "message": "score is required."
        }, 400

    submission, error = (
        SubmissionService.create_submission(
            user_id,
            problem_id,
            score
        )
    )

    if error:
        return {
            "message": error
        }, 400

    return {
        "message": "Submission created.",
        "submission": submission.to_dict()
    }, 201


@submission_bp.route(
    "/api/submissions/me",
    methods=["GET"]
)
@jwt_required()
def get_my_submissions():

    user_id = get_jwt_identity()

    submissions = (
        SubmissionRepository.get_by_user(
            user_id
        )
    )

    return [
        submission.to_dict()
        for submission in submissions
    ], 200