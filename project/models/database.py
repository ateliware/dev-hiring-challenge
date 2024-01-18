from flask_sqlalchemy import SQLAlchemy

# Create the instances of the Flask extensions (flask-sqlalchemy, flask-login, etc.) in
# the global scope, but without any arguments passed in.  These instances are not attached
# to the application at this point.
db = SQLAlchemy()


# define your models classes hereafter

class BaseModel(db.Model):
    # base data model for all objects
    __abstract__ = True
    # define here __repr__ and json methods or any common method
    # that you need for all your models


class History(BaseModel):
    __tablename__ = 'history'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(160), nullable=False)
    fullname = db.Column(db.String(250), nullable=False)
    language = db.Column(db.String(160))
    url = db.Column(db.String(), nullable=False)
    description = db.Column(db.String())
    date = db.Column(db.String(), nullable=False)

    def __init__(self, email, fullname, language, url, description, date):
        self.email = email
        self.fullname = fullname
        self.language = language
        self.url = url
        self.description = description
        self.date = date

    def __repr__(self):
        return f"History({self.email}{self.fullname}{self.language}{self.url}{self.description}{self.date})"
