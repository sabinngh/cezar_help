from app import app
from extensions import db
from sqlalchemy import text

with app.app_context():
    result = db.session.execute(text("""
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        ORDER BY tablename;
    """)).fetchall()

    print(result)