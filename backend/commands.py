import click

from werkzeug.security import generate_password_hash

from extensions import db
from models.user import User


@click.command("list-users")
def list_users():

    users = User.query.order_by(User.id).all()

    if not users:
        click.echo("No users found.")
        return

    click.echo("")
    click.echo(
        f"{'ID':<5}{'Username':<20}{'Email':<35}{'Role'}"
    )

    click.echo("-" * 75)

    for user in users:

        click.echo(
            f"{user.id:<5}"
            f"{user.username:<20}"
            f"{user.email:<35}"
            f"{user.role}"
        )


@click.command("make-admin")
@click.argument("email")
def make_admin(email):

    user = User.query.filter_by(email=email).first()

    if not user:
        click.echo(f"User '{email}' not found.")
        return

    user.role = "admin"

    db.session.commit()

    click.echo(f"✅ {email} is now an admin.")


@click.command("make-student")
@click.argument("email")
def make_student(email):

    user = User.query.filter_by(email=email).first()

    if not user:
        click.echo(f"User '{email}' not found.")
        return

    user.role = "student"

    db.session.commit()

    click.echo(f"✅ {email} is now a student.")


@click.command("delete-user")
@click.argument("email")
def delete_user(email):

    user = User.query.filter_by(email=email).first()

    if not user:
        click.echo(f"User '{email}' not found.")
        return

    db.session.delete(user)

    db.session.commit()

    click.echo(f"🗑️ User '{email}' deleted successfully.")


@click.command("reset-password")
@click.argument("email")
@click.argument("new_password")
def reset_password(email, new_password):

    user = User.query.filter_by(email=email).first()

    if not user:
        click.echo(f"User '{email}' not found.")
        return

    user.password = generate_password_hash(new_password)

    db.session.commit()

    click.echo(f"🔑 Password updated for '{email}'.")


def init_commands(app):

    app.cli.add_command(list_users)

    app.cli.add_command(make_admin)

    app.cli.add_command(make_student)

    app.cli.add_command(delete_user)

    app.cli.add_command(reset_password)