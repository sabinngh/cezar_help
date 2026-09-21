import os
import uuid

from werkzeug.utils import secure_filename

from flask import current_app


class FileService:

    @staticmethod
    def save_file(file, subfolder, allowed_extensions):

        if not file:
            return None, "No file provided."

        filename = secure_filename(file.filename)

        if filename == "":
            return None, "Invalid filename."

        extension = filename.rsplit(".", 1)[-1].lower()

        if extension not in allowed_extensions:

            return None, f"Only {', '.join(allowed_extensions)} files are allowed."

        unique_filename = f"{uuid.uuid4()}.{extension}"

        folder = os.path.join(

            current_app.config["UPLOAD_FOLDER"],

            subfolder

        )

        os.makedirs(folder, exist_ok=True)

        filepath = os.path.join(

            folder,

            unique_filename

        )

        file.save(filepath)

        return unique_filename, None