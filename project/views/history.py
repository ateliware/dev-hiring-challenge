from flask import Blueprint, request, render_template
from project.models.database import History

history_blueprints = Blueprint("history", __name__)

view = {
    "title": "History",
    "name": "history",
}


@history_blueprints.route('/', methods=['GET'])
def index():
    if request.method == 'GET':
        all_history = History.query.all()
        results = [
            {
                "email": history.email,
                "language": history.language,
                "fullname": history.fullname,
                "url": history.url,
                "description": history.description,
                "date": history.date
            } for history in all_history]

        return render_template('renders/history.html', view=view, results=results)
