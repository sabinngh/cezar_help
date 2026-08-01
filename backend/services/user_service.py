from werkzeug.security import generate_password_hash, check_password_hash
from repositories.user_repository import UserRepository


class UserService:

    @staticmethod
    def register_user(username, email, password):
        existing_user = UserRepository.get_by_email(email)
        if existing_user:
            return None, "Email is already registered"

        # Specify pbkdf2:sha256 to avoid the hashlib scrypt error
        hashed_password = generate_password_hash(password, method="pbkdf2:sha256")
        
        user = UserRepository.create_user(username, email, hashed_password)
        return user, None

    @staticmethod
    def login_user(email, password):
        user = UserRepository.get_by_email(email)
        if not user:
            return None, "Invalid email or password"

        if not check_password_hash(user.password, password):
            return None, "Invalid email or password"

        return user, None

    @staticmethod
    def get_users():
        return UserRepository.get_users()