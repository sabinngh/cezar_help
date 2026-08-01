from flask import Flask
from extensions import db
from controllers.user_controller import user_bp
from controllers.home_controller import home_bp
from controllers.auth_controller import auth_bp

app = Flask(__name__,
            template_folder='templates',
            static_folder='static')

app.config["SQLALCHEMY_DATABASE_URI"] = \
    "postgresql://postgres:postgres@localhost:5433/mydatabase"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)

with app.app_context():
    db.create_all()



if __name__ == "__main__":
    app.run(debug=True)

