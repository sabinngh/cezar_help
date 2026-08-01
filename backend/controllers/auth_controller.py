from functools import wraps
from flask import Blueprint, flash, request, render_template, redirect, url_for, session, g, abort
from models.user import User
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
from werkzeug.security import check_password_hash

@auth_bp.route("/login", methods=["GET", "POST"])
def login_page():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(email=email).first()

        # FIXED: Changed password_hash -> password to match your User model
        if user and check_password_hash(user.password, password):
            session["user_id"] = user.id
            return redirect(url_for("auth.profile"))
        else:
            return render_template("login.html", error="Incorrect email or password!")

    return render_template("login.html")


# --- PROFILE & LOGOUT ---

@auth_bp.route("/profile")
def profile():
    if not g.user:
        return redirect(url_for("auth.login_page"))
    return render_template("profile.html")


@auth_bp.route("/logout")
def logout():
    session.clear()  # Erases the login session
    return redirect(url_for("home.home"))


# --- ADMIN DECORATOR & BLUEPRINT ---

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # 1. Check if user is logged in
        user_id = session.get("user_id")
        if not user_id:
            abort(401)  # Unauthorized

        # 2. Query user from DB and check is_admin
        user = User.query.get(user_id)
        if not user or not user.is_admin:
            abort(403)  # Forbidden

        return f(*args, **kwargs)

    return decorated_function


admin_bp = Blueprint("admin", __name__, url_prefix="/admin")


@admin_bp.route("/dashboard")
@admin_required
def admin_dashboard():
    # Only users with is_admin = True can access this
    return render_template("admin/dashboard.html")