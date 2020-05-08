import os
from flask import Flask, request, session, g, redirect, url_for, \
                  abort, render_template, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from sgqlc.endpoint.http import HTTPEndpoint
from sgqlc.operation import Operation
from github_schema import github_schema as schema
from github_schema import Repository
import time
import json

# database config
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
SQLALCHEMY_TRACK_MODIFICATIONS = False
TEMPLATES_AUTO_RELOAD = True

# create app
app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = "_secre_key_" # flask-session
db = SQLAlchemy(app)

import models

class Github:
    """Holds github integrations via graphql api"""
    
    app = app.test_client()
    token = "e39713323ef298488dc0b803562c3351b922d6b5"
    
    def repos(self,first,language):
        """
        Fetch github repositories by programming language
        Sorts by stars

        INPUT:
        
        first -- limits the results at the first n results where n is an integer

        language -- a programming language name

        RETURN: 
        
        a list of github node field

        """
        op = Operation(schema.Query)
        date = time.strftime("%Y-%m-%d")
        q = "language:"+language+" is:public archived:false pushed:>="+date+" sort:stars-desc sort:updated-asc"
        search = op.search(query=q,type='REPOSITORY',first=first)

        # select fields
        search.repository_count()
        search.edges.node.__as__(Repository).id()
        search.edges.node.__as__(Repository).name()
        search.edges.node.__as__(Repository).updated_at()
        search.edges.node.__as__(Repository).description()
        search.edges.node.__as__(Repository).stargazers.total_count()
        search.edges.node.__as__(Repository).primary_language.name()
    
        url = 'https://api.github.com/graphql'
        headers = {'Authorization': 'bearer ' + self.token}
        endpoint = HTTPEndpoint(url,headers)
        data = endpoint(op)
        repos = (op + data).search

        return repos

    def save(self,data):
        """
        Save repositories to database

        INPUT:
        
        data -- list of repositories

        """
        repositories = data['repositories']
        entities = []
        for repo in repositories:
            entities.append(models.RepositoryModel(repo_id=repo['repo_id'],name=repo['name']))
        db.session.add_all(entities)
        db.session.commit()

    def list_repos(self):
        """List all repositories"""
        results = db.session.query(models.RepositoryModel).all()
        repositories = []
        for r in results:
            repositories.append(r.serialize())
        return repositories
        

github = Github()

@app.route('/', methods=['GET'])
def index():
    """Lists github repositories by programming language with javascript as
    default"""
    global github
    languages = {'javascript':'JavaScript','java':'Java','python':'Python','go':'Go','php':'PHP'}
    query = request.args.get("s")
    if query is None:
        query = 'javascript'
    entries = github.repos(first=10,language=query)
    return render_template('index.html', languages=languages, entries=entries,
                           query=query)

@app.route('/add', methods=['POST'])
def add():
    result = {'status': 0, 'message': 'Error'}
    try:
        data = request.get_json()
        new_entry = github.save(data)
        result = {'status': 1, 'message': "Success"}
        flash('Saved to database')
    except Exception as e:
        result = {'status': 0, 'message': repr(e)}
    return jsonify(result)

if __name__ == '__main__':
    app.run()
