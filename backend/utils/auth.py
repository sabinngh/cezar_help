from functools import wraps

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from repositories.user_repository import UserRepository


def admin_required(f):

    @wraps(f)
    @jwt_required()

    def decorated_function(*args, **kwargs):

        user = UserRepository.get_by_id(
            get_jwt_identity()
        )

        if not user:

            return {
                "message": "User not found."
            }, 404

        if user.role != "admin":

            return {
                "message": "Admin access required."
            }, 403

        return f(*args, **kwargs)

    return decorated_function