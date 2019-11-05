import json
import os

from flask import Flask, request, Response, jsonify
from database import PostgreSQL
import psycopg2.extras
import psycopg2

app = Flask(__name__)

@app.route("/")
def ok():
    return "server ok", 200


@app.route("/repos", methods=["GET"])
def get_repos():
    if request.method == "GET":
        base = PostgreSQL.connect()
        cursor = base.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT id, author, name, avatar, url, description, language, stars, forks " +
                       " FROM public.repository WHERE test = false")
        data = jsonify(cursor.fetchall())
        cursor.close()
        base.close()
        return data, 200
    else:
        return "invalid method " + request.method, 405

@app.route("/set/repo", methods=["POST"])
def set_repo():
    if request.method == "POST":
        dt = request.get_json()
        base = PostgreSQL.connect()
        cursor = base.cursor()
        query = 'INSERT INTO public.repository(author, name, avatar, url, description, language, stars, forks) ' + \
                    "VALUES('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', {6}, {7});"\
                    .format(dt["author"], dt["name"],  dt["avatar"], dt["url"], dt["description"], dt["language"],
                            dt["stars"], dt["forks"])
        cursor.execute(query)
        base.commit()
        cursor.close()
        base.close()
        return "{ok: true}", 200
    else:
        return "invalid method " + request.method, 405

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)