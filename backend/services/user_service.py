from repositories.user_repository import UserRepository


class UserService:

    @staticmethod
    def create_user(username, email, password):
        return UserRepository.create_user(
            username,
            email,
            password
        )
    
    @staticmethod
    def get_users():
        return UserRepository.get_users()