from functools import wraps
from flask import Blueprint, flash, request, render_template, redirect, url_for, session, g, abort
from models.user import User
from services.user_service import UserService
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func
from models.problem import Problem
from models.submission import Submission
from extensions import db

auth_bp = Blueprint("auth", __name__)


# --- SIGNUP ---

@auth_bp.route("/api/signup", methods=["POST"])
def signup_page():
    
    data = request.get_json()

    username = data['username']
    email = data['email']
    password = data['password']

    user, error = UserService.register_user(username,email,password)

    if error:
        return {
            "message": error
        }, 409

    return {
        "message": "User created"
    }, 201

# --- LOGIN ---
from werkzeug.security import check_password_hash

@auth_bp.route("/api/login", methods=["POST"])
def login_page():
    data = request.get_json()

    email = data["email"]
    password = data["password"]

    user, error = UserService.login_user(email, password)

    if error:
        return {"message": error}, 401

    access_token = create_access_token(
        identity=str(user.id)
    )
    # JWT aici, momentan putem testa fără JWT
    return {
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict()
    }, 200

# --- PROFILE & LOGOUT ---

@auth_bp.route("/api/profile", methods=["GET"])
@jwt_required()
def jwt_profile():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return {
            "message": "User not found"
        }, 404

    return user.to_dict(), 200

@auth_bp.route("/api/profile", methods=["PUT"])
@jwt_required()
def update_profile():

    user_id = get_jwt_identity()

    data = request.get_json()

    user, error = UserService.update_profile(user_id, data)

    if error:
        return {
            "message": error
        }, 404

    return {
        "message": "Profile updated",
        "user": user.to_dict()
    }, 200


@auth_bp.route("/api/profile/stats", methods=["GET"])
@jwt_required()
def profile_stats():
    user_id = int(get_jwt_identity())

    # -----------------------------------------
    # PROBLEMS AUTHORED
    # -----------------------------------------

    problems_authored = (
        Problem.query
        .filter_by(created_by=user_id)
        .count()
    )


    # -----------------------------------------
    # ALL SUBMISSIONS OF CURRENT USER
    # -----------------------------------------

    submissions = (
        Submission.query
        .filter_by(user_id=user_id)
        .all()
    )

    submissions_count = len(submissions)


    # -----------------------------------------
    # BEST SCORE PER PROBLEM
    #
    # Example:
    # problem 1 -> 30, 60, 100 => 100
    # problem 2 -> 40, 70      => 70
    # -----------------------------------------

    best_scores = {}

    for submission in submissions:

        problem_id = submission.problem_id

        if problem_id not in best_scores:
            best_scores[problem_id] = submission.score

        else:
            best_scores[problem_id] = max(
                best_scores[problem_id],
                submission.score
            )


    # -----------------------------------------
    # SOLVED = BEST SCORE == 100
    # -----------------------------------------

    problems_solved = sum(
        1
        for score in best_scores.values()
        if score >= 100
    )


    perfect_scores = problems_solved


    # -----------------------------------------
    # TOTAL / AVERAGE SCORE
    # -----------------------------------------

    total_score = sum(best_scores.values())

    average_score = (
        total_score / len(best_scores)
        if best_scores
        else 0
    )


    # -----------------------------------------
    # GLOBAL RANK
    #
    # Calculate best score for every user,
    # then sort.
    # -----------------------------------------

    rows = (
        db.session.query(
            Submission.user_id,
            Submission.problem_id,
            func.max(Submission.score).label("best_score")
        )
        .group_by(
            Submission.user_id,
            Submission.problem_id
        )
        .all()
    )

    scores_by_user = {}

    for row in rows:

        if row.user_id not in scores_by_user:
            scores_by_user[row.user_id] = {
                "total_score": 0,
                "solved": 0
            }

        scores_by_user[row.user_id]["total_score"] += (
            row.best_score
        )

        if row.best_score >= 100:
            scores_by_user[row.user_id]["solved"] += 1


    ranking = sorted(
        scores_by_user.items(),
        key=lambda item: (
            item[1]["total_score"],
            item[1]["solved"]
        ),
        reverse=True
    )


    global_rank = None

    for index, (rank_user_id, _) in enumerate(
        ranking,
        start=1
    ):

        if int(rank_user_id) == user_id:
            global_rank = index
            break


    # User with no submissions
    if global_rank is None:
        global_rank = len(ranking) + 1


    # -----------------------------------------
    # ACHIEVEMENTS
    # -----------------------------------------

    achievements = []


    if problems_solved >= 1:
        achievements.append({
            "id": "first_solve",
            "name": "First Contact",
            "description": "Solved your first problem.",
            "icon": "✦",
            "rarity": "common"
        })


    if problems_solved >= 5:
        achievements.append({
            "id": "problem_hunter",
            "name": "Problem Hunter",
            "description": "Solved 5 problems.",
            "icon": "◎",
            "rarity": "rare"
        })


    if problems_solved >= 10:
        achievements.append({
            "id": "elite_solver",
            "name": "Elite Solver",
            "description": "Solved 10 problems.",
            "icon": "◇",
            "rarity": "epic"
        })


    if problems_authored >= 1:
        achievements.append({
            "id": "problem_architect",
            "name": "Problem Architect",
            "description": "Published your first problem.",
            "icon": "⌘",
            "rarity": "rare"
        })


    if perfect_scores >= 3:
        achievements.append({
            "id": "perfect_run",
            "name": "Perfect Run",
            "description": "Earned 3 perfect scores.",
            "icon": "100",
            "rarity": "epic"
        })


    return {
        "problems_authored": problems_authored,
        "problems_solved": problems_solved,

        "submissions_count": submissions_count,

        "total_score": round(total_score, 2),
        "average_score": round(average_score, 2),

        "perfect_scores": perfect_scores,

        "global_rank": global_rank,

        "achievements": achievements

    }, 200


# profile picture 

import os
import uuid

from flask import current_app, request
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models.user import User


ALLOWED_IMAGE_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg",
    "webp"
}


def allowed_image(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in ALLOWED_IMAGE_EXTENSIONS
    )


@auth_bp.route(
    "/api/profile/picture",
    methods=["POST"]
)
@jwt_required()
def upload_profile_picture():

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return {
            "message": "User not found."
        }, 404


    if "file" not in request.files:
        return {
            "message": "No file uploaded."
        }, 400


    file = request.files["file"]


    if file.filename == "":
        return {
            "message": "No file selected."
        }, 400


    if not allowed_image(file.filename):
        return {
            "message":
                "Only PNG, JPG, JPEG and WEBP are allowed."
        }, 400


    extension = (
        file.filename
        .rsplit(".", 1)[1]
        .lower()
    )


    filename = (
        f"{uuid.uuid4().hex}.{extension}"
    )


    upload_folder = os.path.join(
        current_app.root_path,
        "uploads",
        "profile_pictures"
    )


    os.makedirs(
        upload_folder,
        exist_ok=True
    )


    file.save(
        os.path.join(
            upload_folder,
            filename
        )
    )


    user.profile_picture = (
        f"/uploads/profile_pictures/{filename}"
    )


    db.session.commit()


    return {
        "message": "Profile picture updated.",
        "user": user.to_dict()
    }, 200