from functools import wraps
from flask import Blueprint, flash, request, render_template, redirect, url_for, session, g, abort
from models.user import User
from services.user_service import UserService
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

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


