import json
import re

from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity

from repositories.problem_repository import ProblemRepository
from models.problem import Problem
from utils.auth import admin_required


problem_bp = Blueprint("problem", __name__)


def make_slug(title):
    slug = title.lower().strip()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"[\s-]+", "-", slug)
    return slug.strip("-")


def notebook_to_markdown(file):
    notebook = json.load(file)

    markdown_parts = []

    for cell in notebook.get("cells", []):
        cell_type = cell.get("cell_type")
        source = "".join(cell.get("source", []))

        if cell_type == "markdown":
            markdown_parts.append(source)

        elif cell_type == "code":
            markdown_parts.append(
                f"```python\n{source}\n```"
            )

    return "\n\n".join(markdown_parts)


# -----------------------------------
# GET ALL PROBLEMS
# PUBLIC
# -----------------------------------

@problem_bp.route("/api/problems", methods=["GET"])
def get_problems():

    problems = ProblemRepository.get_all()

    return [
        problem.to_dict()
        for problem in problems
    ], 200


# -----------------------------------
# GET ONE PROBLEM
# PUBLIC
# -----------------------------------

@problem_bp.route(
    "/api/problems/<slug>",
    methods=["GET"]
)
def get_problem(slug):

    problem = ProblemRepository.get_by_slug(slug)

    if not problem:
        return {
            "message": "Problem not found."
        }, 404

    return problem.to_dict(), 200


# -----------------------------------
# UPLOAD PROBLEM
# ADMIN ONLY
# -----------------------------------

@problem_bp.route(
    "/api/problems/upload",
    methods=["POST"]
)
@admin_required
def upload_problem():

    user_id = get_jwt_identity()

    title = request.form.get("title")
    difficulty = request.form.get("difficulty")
    short_description = request.form.get(
        "short_description"
    )

    file = request.files.get("file")

    if (
        not title
        or not difficulty
        or not short_description
        or not file
    ):
        return {
            "message": "Missing fields."
        }, 400

    filename = file.filename or ""

    if not filename.lower().endswith(".ipynb"):
        return {
            "message": "Only .ipynb files are supported."
        }, 400

    try:
        content = notebook_to_markdown(file)

    except (
        json.JSONDecodeError,
        UnicodeDecodeError,
        TypeError
    ):
        return {
            "message": "Invalid notebook file."
        }, 400

    slug = make_slug(title)

    if not slug:
        return {
            "message": "Invalid title."
        }, 400

    existing = ProblemRepository.get_by_slug(slug)

    if existing:
        return {
            "message":
                "A problem with this title already exists."
        }, 400

    problem = Problem(
        title=title,
        slug=slug,
        difficulty=difficulty,
        short_description=short_description,
        content=content,
        original_filename=filename,
        created_by=user_id
    )

    ProblemRepository.create(problem)

    return {
        "message": "Problem uploaded.",
        "problem": problem.to_dict()
    }, 201


# -----------------------------------
# DELETE PROBLEM
# ADMIN ONLY
# -----------------------------------

@problem_bp.route(
    "/api/problems/<slug>",
    methods=["DELETE"]
)
@admin_required
def delete_problem(slug):

    problem = ProblemRepository.get_by_slug(slug)

    if not problem:
        return {
            "message": "Problem not found."
        }, 404

    ProblemRepository.delete(problem)

    return {
        "message": "Problem deleted."
    }, 200