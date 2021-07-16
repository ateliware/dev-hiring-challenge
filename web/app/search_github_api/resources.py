from flask import abort, jsonify, json
from flask_restful import Resource
from ..models import GithubRepositories

class RepositoryDetail(Resource):
    def get(self,register_id):
       repository = GithubRepositories.query.filter_by(id=register_id).first() or abort(404)
       return jsonify(repository.to_dict())
        
class RepositoryBySession(Resource):
    def get(self,session_ref):
       repository = GithubRepositories.query.filter_by(session=session_ref).first() or abort(404)
       return jsonify(repository.to_dict())

