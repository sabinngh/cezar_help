from flask import Blueprint, request, render_template
from services.user_service import UserService

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/signup", methods=["GET"])
def signup_page():
    return render_template("signup.html")