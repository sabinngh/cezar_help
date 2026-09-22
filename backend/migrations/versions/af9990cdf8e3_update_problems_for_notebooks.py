"""update problems for notebooks

Revision ID: af9990cdf8e3
Revises: c9c0c6a795be
Create Date: 2026-09-21 17:36:03.840553

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "af9990cdf8e3"
down_revision = "c9c0c6a795be"
branch_labels = None
depends_on = None


def upgrade():

    # 1. Add the new columns.
    #
    # content MUST initially be nullable because old problems
    # already exist in the database.

    with op.batch_alter_table(
        "problems",
        schema=None
    ) as batch_op:

        batch_op.add_column(
            sa.Column(
                "content",
                sa.Text(),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "original_filename",
                sa.String(length=255),
                nullable=True
            )
        )


    # 2. Preserve useful content from the old problems.
    #
    # Existing problems did not have a notebook, so we use their
    # old statement as the initial Markdown content.

    op.execute("""
        UPDATE problems
        SET content = COALESCE(statement, '')
        WHERE content IS NULL
    """)


    # 3. Now every problem has content, so it is safe
    # to make the column NOT NULL.

    with op.batch_alter_table(
        "problems",
        schema=None
    ) as batch_op:

        batch_op.alter_column(
            "content",
            existing_type=sa.Text(),
            nullable=False
        )


    # 4. Remove the old columns that are replaced
    # by notebook content.

    with op.batch_alter_table(
        "problems",
        schema=None
    ) as batch_op:

        batch_op.drop_column("examples")
        batch_op.drop_column("evaluation")
        batch_op.drop_column("image_url")
        batch_op.drop_column("constraints")
        batch_op.drop_column("statement")
        batch_op.drop_column("output_description")
        batch_op.drop_column("input_description")
        batch_op.drop_column("resource_link")
        batch_op.drop_column("hints")


def downgrade():

    # 1. Recreate the old columns.
    #
    # statement is initially nullable so existing rows can
    # safely receive it.

    with op.batch_alter_table(
        "problems",
        schema=None
    ) as batch_op:

        batch_op.add_column(
            sa.Column(
                "hints",
                sa.Text(),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "resource_link",
                sa.String(length=500),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "input_description",
                sa.Text(),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "output_description",
                sa.Text(),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "statement",
                sa.Text(),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "constraints",
                sa.Text(),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "image_url",
                sa.String(length=500),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "evaluation",
                sa.Text(),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                "examples",
                sa.Text(),
                nullable=True
            )
        )


    # 2. Restore notebook content into statement.

    op.execute("""
        UPDATE problems
        SET statement = COALESCE(content, '')
        WHERE statement IS NULL
    """)


    # 3. statement used to be NOT NULL.

    with op.batch_alter_table(
        "problems",
        schema=None
    ) as batch_op:

        batch_op.alter_column(
            "statement",
            existing_type=sa.Text(),
            nullable=False
        )


    # 4. Remove notebook columns.

    with op.batch_alter_table(
        "problems",
        schema=None
    ) as batch_op:

        batch_op.drop_column(
            "original_filename"
        )

        batch_op.drop_column(
            "content"
        )