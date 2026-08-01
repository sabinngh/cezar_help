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
    def get_users():
        users = User.query.all()
        return [user.to_dict() for user in users]
    