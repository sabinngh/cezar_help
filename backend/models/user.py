from extensions import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    # Increased length to 255 to store password hashes safely
    password = db.Column(db.String(255), nullable=False)

    high_school = db.Column(db.String(255))
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    github = db.Column(db.String(255))
    about = db.Column(db.Text)

    role = db.Column(
        db.String(20),
        nullable=False,
        default="user"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "high_school": self.high_school,
            "city": self.city,
            "country": self.country,
            "github": self.github,
            "about": self.about,
            "role" : self.role
        }

    problems = db.relationship(
        "Problem",
        backref="author",
        lazy=True
    )



