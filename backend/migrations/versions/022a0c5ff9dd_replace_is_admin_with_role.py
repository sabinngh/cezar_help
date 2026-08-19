"""Replace is_admin with role

Revision ID: 022a0c5ff9dd
Revises: 0048d024f293
Create Date: 2026-08-19 19:59:28.323836

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '022a0c5ff9dd'
down_revision = '0048d024f293'
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table("users") as batch_op:

        # Adaugă coloana PERMIȚÂND NULL temporar
        batch_op.add_column(
            sa.Column("role", sa.String(length=20), nullable=True)
        )

    # Toți utilizatorii existenți devin "user"
    op.execute("UPDATE users SET role = 'user'")

    with op.batch_alter_table("users") as batch_op:

        # Coloana devine obligatorie
        batch_op.alter_column(
            "role",
            existing_type=sa.String(length=20),
            nullable=False
        )

        # Ștergem vechiul câmp
        batch_op.drop_column("is_admin")


def downgrade():

    with op.batch_alter_table("users") as batch_op:

        batch_op.add_column(
            sa.Column(
                "is_admin",
                sa.Boolean(),
                nullable=True
            )
        )

        batch_op.drop_column("role")
