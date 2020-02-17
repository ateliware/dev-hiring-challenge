from sqlalchemy import extract 
from sqlalchemy.orm import sessionmaker, scoped_session, joinedload
from DBClasses import Repository, engine, Repository_Data_info
import json
import requests
import base64

DBSession = sessionmaker(bind=engine)

def add(obj):
    session = DBSession()
    session.add(obj)
    session.commit()
    session.refresh(obj)
    session.close()
    return obj

def delete(obj):
    session = DBSession()
    session.delete(obj)
    session.commit()
    session.close()

def set_repository_in_database(language_name):
    concatened_url = "https://api.github.com/search/repositories?q=language:" + language_name + "&sort=stars&order=desc"
    response = requests.get(concatened_url)
    values = response.json()['items']
    if len(values) > 0:
        repository = Repository(language_name)
        already_inserted = add(repository)
    else:
        return

    for i in values:
        item_repository = Repository_Data_info(i['id'], str(i['name'].encode('utf-8'))[2:-1] if i['name'] is not None else "", str(i['description'].encode('utf-8'))[2:-1]  if i['description'] is not None else "", str(i['url'].encode('utf-8'))[2:-1] if i['url'] is not None else "", already_inserted.id)
        add(item_repository)

def get_repositories_in_database():
    session = DBSession()
    repository = session.query(Repository).all()
    session.close()
    return repository

def get_data_repositories_by_repository_id(repository_id):
    session = DBSession()
    repositories = session.query(Repository_Data_info).filter(Repository_Data_info.repository_id == repository_id).order_by(Repository_Data_info.detail_id).all()
    session.close()
    return repositories

def jprint(obj):
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)