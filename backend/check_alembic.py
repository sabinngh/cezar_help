from app import app
from extensions import db
from sqlalchemy import text

with app.app_context():
    db.session.execute(
        text("DROP TABLE IF EXISTS alembic_version")
    )
    db.session.commit()

    print("Dropped alembic_version.")