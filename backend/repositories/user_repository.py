from extensions import db
from models.user import User


class UserRepository:

    @staticmethod
    def create_user(username, email, password):
        user = User(
            username=username,
            email=email,
            password=password
        )

        db.session.add(user)
        db.session.commit()

        return user

    @staticmethod
    def get_by_email(email):
        """Looks up a user by email in PostgreSQL."""
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_by_username(username):
        """Looks up a user by username in PostgreSQL."""
        return User.query.filter_by(username=username).first()
    
    @staticmethod
    def get_users():
        users = User.query.all()
        return [user.to_dict() for user in users]