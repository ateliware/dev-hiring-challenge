from flask import render_template
from flask import abort
from flask import current_app 
from flask import session
from flask import request
from ..ext.database import db
from ..models import GithubRepositories , GithubHistorySearch
from sqlalchemy.exc import SQLAlchemyError
from github import Github
from jinja2 import TemplateNotFound
from datetime import datetime
import uuid


def index():
    # Last searches
    data_historysearch = get_datahistory()

    try:
        return render_template("search_github_index.html",data_history=data_historysearch)
    except TemplateNotFound:
        abort(404)


def search_github():
    # Generates session for each query
    session['usersession'] = str(uuid.uuid4())     

    # Words to customize search
    keywords = request.form["keywords"].strip()[0:40]

    # Consult github api 
    data_repositories = []
    languages = current_app.config.GITHUB_DEFAULT_LANGUAGES
    languages_qtd = current_app.config.GITHUB_QUANTITY_RESULTS 
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    gh_api = Github(current_app.config.GITHUB_ACCESS_TOKEN)

    for lang in languages:
        key_search = '';
        if(len(keywords) > 0):
            key_search = keywords + '+'
        repositories = gh_api.search_repositories(key_search + 'language:%s,sort:stars,order:desc+per_page:15+page:1' % lang)
        ite = 0
        for repo in repositories:
            ite += 1

            data_item = {}
            data_item['language'] = lang
            data_item['language_img'] = '/static/images/language_' + lang.lower() + '.png'
            data_item['repository_id'] = int(repo.id)
            data_item['name'] = ''
            data_item['full_name'] = ''
            data_item['description'] = ''
            data_item['size'] = int(repo.size)
            data_item['stargazers_count'] = int(repo.stargazers_count)
            data_item['forks_count'] = int(repo.forks_count)
            data_item['network_count'] = int(repo.network_count)
            data_item['url'] = ''
            data_item['git_url'] = ''
            data_item['clone_url'] = ''
            data_item['downloads_url'] = ''
            data_item['homepage'] = ''
            data_item['organization_login'] = ''
            data_item['organization_avatar_url'] = ''
            data_item['organization_name'] = ''
            data_item['organization_description'] = ''
            
            # Treatment and cleaning data
            if repo.name != None : data_item['name'] = str((repo.name.encode('utf-8')))[0:250]
            if repo.full_name != None : data_item['full_name'] = str((repo.full_name.encode('utf-8')))[0:250]
            if repo.description != None : data_item['description'] = str((repo.description.encode('utf-8')))[0:250]
            if repo.url != None : data_item['url'] = str((repo.url))[0:250]
            if repo.git_url != None : data_item['git_url'] = str((repo.git_url))[0:250]
            if repo.clone_url != None : data_item['clone_url'] = str((repo.clone_url))[0:250]
            if repo.downloads_url != None : data_item['downloads_url'] = str((repo.downloads_url))[0:250]
            if repo.homepage != None : data_item['homepage'] = str((repo.homepage))[0:250]
            if(repo.organization  != None):
                if repo.organization.login != None : data_item['organization_login'] = str((repo.organization.login))[0:250] 
                if repo.organization.avatar_url != None : data_item['organization_avatar_url'] = str((repo.organization.avatar_url))[0:250]
                if repo.organization.name != None : data_item['organization_name'] = str((repo.organization.name.encode('utf-8')))[0:250]
                if repo.organization.description != None : data_item['organization_description'] = str((repo.organization.description.encode('utf-8')))[0:250]
    		
            data_repositories.append(data_item)

            if (ite == languages_qtd):
                break    
    
    # Update application database 
    try:
        # Historical record search
        register = GithubHistorySearch(
                session = session['usersession'], 
                keywords = keywords,
                date = current_date
                )
        db.session.add(register)

        # Repositories located
        for data_item in data_repositories:
            register = GithubRepositories(
                    session = session['usersession'], 
                    language = data_item['language'],
                    language_img = data_item['language_img'],
                    repository_id = data_item['repository_id'],
                    name = data_item['name'],
                    full_name = data_item['full_name'],
                    description = data_item['description'],
                    size = data_item['size'],
                    stargazers_count = data_item['stargazers_count'],
                    forks_count = data_item['forks_count'],
                    network_count = data_item['network_count'],
                    url = data_item['url'],
                    git_url = data_item['git_url'],
                    clone_url = data_item['clone_url'],
                    downloads_url = data_item['downloads_url'],
                    homepage = data_item['homepage'],
                    organization_login = data_item['organization_login'],
                    organization_avatar_url = data_item['organization_avatar_url'],
                    organization_name = data_item['organization_name'],
                    organization_description = data_item['organization_description'],
                    date = current_date
                    )
            db.session.add(register)
        
        db.session.commit()
    except SQLAlchemyError as e:
        print(e) # [DEBUG]
        abort(404)
    
    # Last searches
    data_historysearch = get_datahistory()
    
    try:
        data_repositories = GithubRepositories.query.filter_by(session=session['usersession']).all() or abort(404)
        return render_template("search_github_datalist.html" , data=data_repositories, keywords=keywords, data_history=data_historysearch )
    except TemplateNotFound:
        abort(404)

def get_detail(id):
    try:
        repository = GithubRepositories.query.filter_by(id=id).first() or abort(404)
    except SQLAlchemyError as e:
        abort(404)

    try:
        return render_template("search_github_detail.html" , data=repository)
    except TemplateNotFound:
        abort(404)


def viewhistory(sessionfind):
    # Last searches
    data_historysearch = get_datahistory()

    # Record to consult
    session_search = sessionfind

    # Applied keywords
    try:
        keywords = ''
        history_register = GithubHistorySearch.query.filter_by(session=session_search).first() or abort(404)
        if(history_register):
            keywords = history_register.keywords
    except SQLAlchemyError as e:
        abort(404)

    try:
        data_repositories = GithubRepositories.query.filter_by(session=session_search).all() or abort(404)
        return render_template("search_github_datalist.html" , data=data_repositories, keywords=keywords, data_history=data_historysearch )
    except TemplateNotFound:
        abort(404)


def get_datahistory():
    try:
        data_historysearch = GithubHistorySearch.query.order_by(GithubHistorySearch.date.desc()).limit(10).all() 
        return data_historysearch
    except SQLAlchemyError as e:
        abort(404)

