from flask import Blueprint, request, render_template
from project.controllers.Core import get_languages, search_github

search_blueprints = Blueprint("search", __name__)

view = {
    "title": "Search",
    "name": "search",
}


@search_blueprints.route('/')
def index():
    return render_template('renders/search.html', view=view, languages=get_languages())


@search_blueprints.route('/search', methods=['POST'])
def search():
    if request.method == 'POST':
        email = request.form['email']
        keywords = request.form['lang_one'] if request.form['lang_one'] else ""
        keywords += ',' + request.form['lang_two'] if request.form['lang_two'] else ""
        keywords += ',' + request.form['lang_three'] if request.form['lang_three'] else ""
        keywords += ',' + request.form['lang_four'] if request.form['lang_four'] else ""
        keywords += ',' + request.form['lang_five'] if request.form['lang_five'] else ""

        results, qty = search_github(email, keywords)
        return render_template('renders/search.html', view=view, results=results, qty=qty, languages=get_languages())
