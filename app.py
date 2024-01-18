from project import create_app
from project.models.database import db


# Call the application factory function to construct a Flask application
# instance using the development configuration
app = create_app('flask.cfg')
app.app_context().push()
db.create_all()

if __name__ == '__main__':
    app.run(port=8001)
