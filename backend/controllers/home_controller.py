from flask import Blueprint, render_template

home_bp = Blueprint("home", __name__)


@home_bp.route("/")
def home():
    return render_template("index.html")


# Route for Meet the Team page
@home_bp.route("/team")
def team():
    return render_template("page.html")