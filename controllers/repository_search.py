from flask import Blueprint, render_template, request, redirect, url_for, session
from urllib.request import urlopen
from urllib.parse import urlencode
from urllib.error import HTTPError
import json

from models.repository import Repository
from app import db

LANGS_NUMBER = 5

lang_keys = [ f'lang_{i}' for i in range(0, LANGS_NUMBER) ]
repositories = Blueprint( 'repositories', __name__ )

results = []

@repositories.route( '/' )
@repositories.route( '/search', methods=[ 'GET', 'POST' ] )
def enter_search():
    if request.method == 'POST':
        for key in lang_keys:
            session[ key ] = request.form.get( key )
        return redirect( url_for( 'repositories.show_results' ) )
    return render_template( 'search.html', lang_keys=lang_keys )

@repositories.route( '/results' )
def show_results():
    results = []
    for key in lang_keys:
        lang = session.get( key )
        params = urlencode( { 'q':f'language:{lang}', 'sort':'stars', 'order':'desc' } )
        try:
            with urlopen( 'https://api.github.com/search/repositories?' + params ) as response:
                data = json.load( response )['items'][0]
                result = Repository.query.filter( Repository.lang==lang ).first()
                if not result:
                    result = Repository( lang, data['full_name'], data['description'], data['html_url'], data['watchers'] )
                    db.session.add( result )
                else:
                    result.name = data['full_name']
                    result.description = data['description']
                    result.link = data['html_url']
                    result.stars = data['watchers']
                results.append( result )
                db.session.commit()
        except HTTPError as e:
            print( e )
    return render_template( 'results.html', results=results )