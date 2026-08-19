from models.problem import Problem

from repositories.problem_repository import ProblemRepository

from utils.slug import slugify


class ProblemService:

    ALLOWED_DIFFICULTIES = [
        "Easy",
        "Medium",
        "Hard"
    ]

    @staticmethod
    def create_problem(data, user_id):

        required_fields = [

            "title",
            "short_description",
            "statement",
            "difficulty"

        ]

        for field in required_fields:

            if field not in data or not str(data[field]).strip():

                return None, f"{field} is required."

        if data["difficulty"] not in ProblemService.ALLOWED_DIFFICULTIES:

            return None, "Invalid difficulty."

        title = data["title"].strip()

        slug = slugify(title)

        if ProblemRepository.get_by_slug(slug):

            return None, "A problem with this title already exists."

        problem = Problem(

            title=title,

            slug=slug,

            difficulty=data["difficulty"],

            short_description=data["short_description"].strip(),

            statement=data["statement"].strip(),

            input_description=data.get(
                "input_description",
                ""
            ).strip(),

            output_description=data.get(
                "output_description",
                ""
            ).strip(),

            constraints=data.get(
                "constraints",
                ""
            ).strip(),

            examples=data.get(
                "examples",
                ""
            ).strip(),

            evaluation=data.get(
                "evaluation",
                ""
            ).strip(),

            hints=data.get(
                "hints",
                ""
            ).strip(),

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
    def update_problem(slug, data):

        problem = ProblemRepository.get_by_slug(slug)

        if not problem:

            return None, "Problem not found."

        if "title" in data:

            title = data["title"].strip()

            if not title:

                return None, "Title cannot be empty."

            new_slug = slugify(title)

            existing = ProblemRepository.get_by_slug(new_slug)

            if existing and existing.id != problem.id:

                return None, "A problem with this title already exists."

            problem.title = title
            problem.slug = new_slug

        if "difficulty" in data:

            if data["difficulty"] not in ProblemService.ALLOWED_DIFFICULTIES:

                return None, "Invalid difficulty."

            problem.difficulty = data["difficulty"]

        text_fields = [

            "short_description",
            "statement",
            "input_description",
            "output_description",
            "constraints",
            "examples",
            "evaluation",
            "hints",
            "resource_link",
            "image_url"

        ]

        for field in text_fields:

            if field in data:

                value = data[field]

                if value is None:

                    value = ""

                setattr(problem, field, value.strip())

        ProblemRepository.update()

        return problem, None

    @staticmethod
    def delete_problem(slug):

        problem = ProblemRepository.get_by_slug(slug)

        if not problem:

            return "Problem not found."

        ProblemRepository.delete(problem)

        return None