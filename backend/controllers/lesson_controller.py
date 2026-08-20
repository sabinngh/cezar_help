from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import User
from repositories.lesson_repository import LessonRepository


lesson_bp = Blueprint(
    "lessons",
    __name__,
    url_prefix="/api/lessons"
)


@lesson_bp.route("", methods=["GET"])
def get_lessons():

    category = request.args.get("category")

    if category:
        lessons = LessonRepository.get_by_category(category)
    else:
        lessons = LessonRepository.get_all()

    return {
        "lessons": [
            lesson.to_dict()
            for lesson in lessons
        ]
    }, 200


@lesson_bp.route("/<int:lesson_id>", methods=["GET"])
def get_lesson(lesson_id):

    lesson = LessonRepository.get_by_id(lesson_id)

    if not lesson:
        return {
            "message": "Lesson not found"
        }, 404

    return lesson.to_dict(), 200


@lesson_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_lesson():

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != "admin":
        return {
            "message": "Admin access required"
        }, 403

    title = request.form.get("title")
    category = request.form.get("category")
    file = request.files.get("file")

    if not title or not category or not file:
        return {
            "message": "Missing fields"
        }, 400

    filename = file.filename

    if not (
        filename.endswith(".md")
        or filename.endswith(".txt")
        or filename.endswith(".ipynb")
    ):
        return {
            "message": "Only .md, .txt, and .ipynb files are supported"
        }, 400

    import json

    if filename.endswith(".ipynb"):
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

        content = "\n\n".join(markdown_parts)

    else:
        content = file.read().decode("utf-8")

    lesson = LessonRepository.create(
        title,
        category,
        content,
        filename
    )

    return {
        "message": "Lesson uploaded",
        "lesson": lesson.to_dict()
    }, 201

@lesson_bp.route("/<int:lesson_id>", methods=["DELETE"])
@jwt_required()
def delete_lesson(lesson_id):

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user or user.role != "admin":
        return {
            "message": "Admin access required"
        }, 403

    lesson = LessonRepository.get_by_id(lesson_id)

    if not lesson:
        return {
            "message": "Lesson not found"
        }, 404

    LessonRepository.delete(lesson)

    return {
        "message": "Lesson deleted"
    }, 200