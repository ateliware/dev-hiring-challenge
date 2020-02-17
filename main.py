from flask import Flask, render_template, request, redirect, url_for
from DBClasses import Repository, Repository_Data_info
from sqlalchemy import extract  
import Database as db
import datetime

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    mensagem = request.args.get('mensagem')
    repositories = db.get_repositories_in_database()
    if len(repositories) > 0: 
        has_repository = True
    else:
        has_repository = False

    return render_template('index.html', has_repository=has_repository, repositories=repositories, mensagem=mensagem)

@app.route('/registerrepository/', methods = ['POST'])
def register_repository():
    language_filter = request.form.get("language")
    db.set_repository_in_database(language_filter)
    return redirect(url_for('index'))

@app.route('/repositorydetail/<int:repository_id>', methods = ['GET'])
def repository_detail(repository_id = None):
    repository_details = db.get_data_repositories_by_repository_id(repository_id)
    return render_template('details.html', repository_details=repository_details)


if __name__ == "__main__":
    app.run()