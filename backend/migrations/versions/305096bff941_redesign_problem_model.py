"""Redesign problem model

Revision ID: 305096bff941
Revises: 6c7e08e3776c
Create Date: 2026-08-19 21:49:10.418513
"""

from alembic import op
import sqlalchemy as sa


revision = "305096bff941"
down_revision = "6c7e08e3776c"
branch_labels = None
depends_on = None


def upgrade():

    conn = op.get_bind()
    inspector = sa.inspect(conn)

    existing_columns = {
        column["name"]
        for column in inspector.get_columns("problems")
    }

    with op.batch_alter_table("problems") as batch_op:

        if "short_description" not in existing_columns:
            batch_op.add_column(
                sa.Column(
                    "short_description",
                    sa.String(500),
                    nullable=True
                )
            )

        if "statement" not in existing_columns:
            batch_op.add_column(
                sa.Column(
                    "statement",
                    sa.Text(),
                    nullable=True
                )
            )

        if "input_description" not in existing_columns:
            batch_op.add_column(
                sa.Column(
                    "input_description",
                    sa.Text()
                )
            )

        if "output_description" not in existing_columns:
            batch_op.add_column(
                sa.Column(
                    "output_description",
                    sa.Text()
                )
            )

        if "constraints" not in existing_columns:
            batch_op.add_column(
                sa.Column(
                    "constraints",
                    sa.Text()
                )
            )

        if "examples" not in existing_columns:
            batch_op.add_column(
                sa.Column(
                    "examples",
                    sa.Text()
                )
            )

        if "evaluation" not in existing_columns:
            batch_op.add_column(
                sa.Column(
                    "evaluation",
                    sa.Text()
                )
            )

        if "image_url" not in existing_columns:
            batch_op.add_column(
                sa.Column(
                    "image_url",
                    sa.String(500)
                )
            )

    # Refresh schema info after additions
    inspector = sa.inspect(conn)
    existing_columns = {
        column["name"]
        for column in inspector.get_columns("problems")
    }

    # Only copy from description if the old column still exists
    if "description" in existing_columns:
        op.execute("""
            UPDATE problems
            SET
                short_description = COALESCE(short_description, LEFT(description, 250)),
                statement = COALESCE(statement, description)
        """)

    with op.batch_alter_table("problems") as batch_op:

        batch_op.alter_column(
            "short_description",
            existing_type=sa.String(500),
            nullable=False
        )

        batch_op.alter_column(
            "statement",
            existing_type=sa.Text(),
            nullable=False
        )

        if "description" in existing_columns:
            batch_op.drop_column("description")

def downgrade():

    with op.batch_alter_table("problems") as batch_op:

        batch_op.add_column(
            sa.Column(
                "description",
                sa.Text(),
                nullable=True
            )
        )

    op.execute("""

        UPDATE problems

        SET description = statement

    """)

    with op.batch_alter_table("problems") as batch_op:

        batch_op.alter_column(
            "description",
            nullable=False
        )

        batch_op.drop_column("image_url")
        batch_op.drop_column("evaluation")
        batch_op.drop_column("examples")
        batch_op.drop_column("constraints")
        batch_op.drop_column("output_description")
        batch_op.drop_column("input_description")
        batch_op.drop_column("statement")
        batch_op.drop_column("short_description")