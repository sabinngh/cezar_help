from flask import Flask, g, session
from extensions import db

from models.user import User
from models.problem import Problem

from controllers.user_controller import user_bp
from controllers.home_controller import home_bp
from controllers.auth_controller import auth_bp
from controllers.problem_controller import problem_bp

from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

from controllers.lesson_controller import lesson_bp
from models.lesson import Lesson
from datetime import timedelta

app = Flask(__name__,
            template_folder='templates',
            static_folder='static')


CORS(app, origins=["http://localhost:5173"])

# --- CONFIGURATION ---
app.config["SECRET_KEY"] = "carinas-secret-key-here"
app.config["JWT_SECRET_KEY"] = "carinas-jwt-secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)

jwt = JWTManager(app)
app.config["SQLALCHEMY_DATABASE_URI"] = \
    "postgresql://postgres:postgres@localhost:5433/mydatabase"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize extensions
db.init_app(app)

migrate = Migrate(app, db)

# --- USER SESSION HOOK ---
@app.before_request
def load_logged_in_user():
    user_id = session.get("user_id")
    if user_id is None:
        g.user = None
    else:
        g.user = User.query.get(user_id)

# --- BLUEPRINTS ---
app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)

app.register_blueprint(lesson_bp)
app.register_blueprint(home_bp)
app.register_blueprint(problem_bp)

# --- DB INITIALIZATION ---
with app.app_context():
    db.create_all()

# --- APP ENTRYPOINT ---
if __name__ == "__main__":
    app.run(debug=True, port=5001)