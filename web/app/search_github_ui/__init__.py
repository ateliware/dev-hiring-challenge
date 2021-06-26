from flask import Blueprint
from .views import index , search_github, get_detail , viewhistory

bp = Blueprint("search_github_ui", __name__ )

bp.add_url_rule("/", view_func=index)
bp.add_url_rule("/index", view_func=index)
bp.add_url_rule("/searchgithub", view_func=search_github, endpoint='searchgithub',methods=['POST','GET'] )
bp.add_url_rule("/getdetail/<int:id>", view_func=get_detail )
bp.add_url_rule("/viewhistory/<sessionfind>", view_func=viewhistory )

def init_app(app):
    app.register_blueprint(bp)
