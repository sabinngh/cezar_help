from extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    # Increased length to 255 to store password hashes safely
    password = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

    # ADD THIS: Defaults to False for regular users
    is_admin = db.Column(db.Boolean, default=False)

