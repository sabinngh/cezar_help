from flask import Blueprint, request

from flask_jwt_extended import get_jwt_identity

from services.problem_service import ProblemService
from utils.auth import admin_required


problem_bp = Blueprint("problem", __name__)


@problem_bp.route("/api/problems", methods=["GET"])
def get_problems():

    problems = ProblemService.get_all()

    return [problem.to_dict() for problem in problems], 200


@problem_bp.route("/api/problems/<slug>", methods=["GET"])
def get_problem(slug):

    problem = ProblemService.get_by_slug(slug)

    if not problem:
        return {
            "message": "Problem not found."
        }, 404

    return problem.to_dict(), 200


@problem_bp.route("/api/problems", methods=["POST"])
@admin_required
def create_problem():

    problem, error = ProblemService.create_problem(
        request.get_json(),
        get_jwt_identity()
    )

    if error:
        return {
            "message": error
        }, 400

    return {
        "message": "Problem created.",
        "problem": problem.to_dict()
    }, 201


@problem_bp.route("/api/problems/<slug>", methods=["PUT"])
@admin_required
def update_problem(slug):

    problem, error = ProblemService.update_problem(
        slug,
        request.get_json()
    )

    if error:
        return {
            "message": error
        }, 400

    return {
        "message": "Problem updated.",
        "problem": problem.to_dict()
    }, 200


@problem_bp.route("/api/problems/<slug>", methods=["DELETE"])
@admin_required
def delete_problem(slug):

    error = ProblemService.delete_problem(slug)

    if error:
        return {
            "message": error
        }, 404

    return {
        "message": "Problem deleted."
    }, 200