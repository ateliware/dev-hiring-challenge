from flask import Flask, request
from flask_cors import CORS
import os
from repositories import Repository
from bd import MySql
import json


app = Flask(__name__)
port = int(os.environ.get("PORT", 5000))
CORS(app)

@app.route('/')
def home():
    return 'Docker'

@app.route('/repo', methods =['POST'])
def get_Repo():
    repositories_bd = MySql().select_language(request.json['language'])
    if(len(json.loads(repositories_bd)) < 1):
        repositories = Repository().get_repositories(request.json['language'])
        MySql().insert_new_language(repositories)
        repositories_bd = MySql().select_language(request.json['language'])

    return repositories_bd
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=port)