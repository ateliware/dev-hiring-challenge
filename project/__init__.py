from flask import Flask
from flask_migrate import Migrate
from flask_bootstrap import Bootstrap5
from project.models.database import db


#######################
#### Configuration ####
#######################


######################################
#### Application Factory Function ####
######################################

def create_app(config_filename=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_pyfile(config_filename)
    initialize_extensions(app)
    register_blueprints(app)
    bootstrap = Bootstrap5(app)
    return app


##########################
#### Helper Functions ####
##########################

def initialize_extensions(app):
    # Since the application instance is now created, pass it to each Flask
    # extension instance to bind it to the Flask application instance (app)
    db.init_app(app)
    migrate = Migrate()
    migrate.init_app(app, db)


def register_blueprints(app):
    # Since the application instance is now created, register each Blueprint
    # with the Flask application instance (app)
    from project.views.history import history_blueprints
    from project.views.search import search_blueprints

    app.register_blueprint(history_blueprints, url_prefix="/history")
    app.register_blueprint(search_blueprints, url_prefix="/")
