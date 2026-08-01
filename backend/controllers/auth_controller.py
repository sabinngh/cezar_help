from flask import Blueprint, request, render_template, redirect, url_for
from services.user_service import UserService

auth_bp = Blueprint("auth", __name__)


# --- SIGNUP ---

@auth_bp.route("/signup", methods=["GET", "POST"])
def signup_page():
    if request.method == "POST":
        # Get data from HTML form fields
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")

        user, error = UserService.register_user(username, email, password)
        if error:
            return render_template("signup.html", error=error)

        # Successfully registered, redirect to login page
        return redirect(url_for("auth.login_page"))

    return render_template("signup.html")


# --- LOGIN ---

@auth_bp.route("/login", methods=["GET", "POST"])
def login_page():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user, error = UserService.login_user(email, password)
        if error:
            return render_template("login.html", error=error)

        # Successful login -> redirect to home page
        return redirect(url_for("home.home"))

    return render_template("login.html")