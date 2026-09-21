from extensions import db
from models.lesson import Lesson


class LessonRepository:

    @staticmethod
    def create(title, category, content, filename=None):
        lesson = Lesson(
            title=title,
            category=category,
            content=content,
            original_filename=filename
        )

        db.session.add(lesson)
        db.session.commit()

        return lesson

    @staticmethod
    def get_all():
        return Lesson.query.order_by(
            Lesson.created_at.desc()
        ).all()

    @staticmethod
    def get_by_id(lesson_id):
        return Lesson.query.get(lesson_id)

    @staticmethod
    def get_by_category(category):
        return Lesson.query.filter_by(
            category=category
        ).order_by(
            Lesson.created_at.desc()
        ).all()

    @staticmethod
    def delete(lesson):
        db.session.delete(lesson)
        db.session.commit()