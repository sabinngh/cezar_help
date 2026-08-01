from flask import Blueprint, request
from services.user_service import UserService

user_bp = Blueprint("users", __name__)


@user_bp.route("/users", methods=["POST"])
def create_user():

    data = request.get_json()

    user = UserService.create_user(
        data["username"],
        data["email"],
        data["password"]
    )

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email
    }, 201

@user_bp.route("/users", methods=["GET"])
def get_users():

    users = UserService.get_users()

    return users, 200