from models.problem import Problem

from repositories.problem_repository import ProblemRepository

from services.file_service import FileService

from utils.slug import slugify


class ProblemService:

    ALLOWED_DIFFICULTIES = [

        "Easy",

        "Medium",

        "Hard"

    ]

    @staticmethod
    def create_problem(

        data,

        notebook,

        starter_archive,

        ground_truth,

        user_id

    ):

        title = data.get("title", "").strip()

        difficulty = data.get("difficulty", "").strip()

        if not title:

            return None, "Title is required."

        if difficulty not in ProblemService.ALLOWED_DIFFICULTIES:

            return None, "Invalid difficulty."

        slug = slugify(title)

        if ProblemRepository.get_by_slug(slug):

            return None, "A problem with this title already exists."

        notebook_filename, error = FileService.save_file(

            notebook,

            "notebooks",

            {"ipynb"}

        )

        if error:

            return None, error

        starter_filename, error = FileService.save_file(

            starter_archive,

            "starter",

            {"zip"}

        )

        if error:

            return None, error

        ground_truth_filename, error = FileService.save_file(

            ground_truth,

            "ground_truth",

            {"csv"}

        )

        if error:

            return None, error

        problem = Problem(

            title=title,

            slug=slug,

            difficulty=difficulty,

            notebook_file=notebook_filename,

            starter_archive=starter_filename,

            ground_truth_file=ground_truth_filename,

            resource_link=data.get(

                "resource_link",

                ""

            ).strip(),

            image_url=data.get(

                "image_url",

                ""

            ).strip(),

            created_by=user_id

        )

        ProblemRepository.create(problem)

        return problem, None

    @staticmethod
    def get_all():

        return ProblemRepository.get_all()

    @staticmethod
    def get_by_slug(slug):

        return ProblemRepository.get_by_slug(slug)

    @staticmethod
    def delete_problem(slug):

        problem = ProblemRepository.get_by_slug(slug)

        if not problem:

            return "Problem not found."

        ProblemRepository.delete(problem)

        return None