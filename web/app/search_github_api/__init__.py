from flask import Blueprint
from flask_restful import Api
from .resources import RepositoryDetail, RepositoryBySession

bp = Blueprint("search_github_api", __name__, url_prefix="/api/v1")
api = Api(bp)

def init_app(app):
    api.add_resource(RepositoryDetail, "/repository/<register_id>")
    api.add_resource(RepositoryBySession, "/RepositoryBySession/<session_ref>")
    app.register_blueprint(bp)
