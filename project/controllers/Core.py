from datetime import datetime
from project.models.database import db, History
import json
from types import SimpleNamespace
from urllib.parse import urlencode
import requests
from project.models.repository import Repo


# DATABASE
def handled_history(email, data):
    # store the repositories found in the search
    new_history = History(email=email, fullname=data.full_name, language=data.language, url=data.html_url,
                          description=data.description, date=datetime.now().strftime("%d/%m/%Y %H:%M:%S"))

    db.session.add(new_history)
    db.session.commit()


# GITHUB
def search_github(email, keywords):
    # API URL EXAMPLE https://api.github.com/search/repositories?q=Python+language:Python&sort=stars&order=desc
    # This request search for repositories with the word "Python" in the name, the description, or the README.
    # Limiting the results to only find repositories where the primary language is Python. Sorting by stars
    # in descending order, so that the most popular repositories appear first in the search results.

    results = []
    qty = 0
    keywords = [keyword.strip() for keyword in keywords.split(',')]
    for keyword in keywords:
        api_url = "https://api.github.com/search/repositories?"
        sort, order = 'star', 'desc'
        params = {'q': (keyword + 'language:' + keyword), 'sort': sort, 'order': order}
        query_url = api_url + urlencode(params)
        r = requests.get(query_url)
        if r.status_code == 200:
            data = json.loads(r.text, object_hook=lambda d: SimpleNamespace(**d))
            qty += len(data.items)
            for i in data.items[:2]:
                results.append(Repo(i))

    for repo in results:
        handled_history(email, repo)

    return results, qty


def get_languages():
    # Retrieve a list of languages from GitHub API https://api.github.com/languages
    languages_list = []
    api_url = "https://api.github.com/languages"
    r = requests.get(api_url)
    if r.status_code == 200:
        data = json.loads(r.text)
        for lang in data:
            languages_list.append(lang['name'])
        return languages_list

    else:
        # In case response 403 GitHub API Rate limit exceeded return an error
        return {'error loading data'}

