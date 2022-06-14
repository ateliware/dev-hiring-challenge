import requests
import os
from apps.github.consts import GITHUB_API

def mountApiString(label, language, page):
    if label == None or language == None:
        return GITHUB_API
    return GITHUB_API + '?q=label:' + label + '+language:' + language + '&page=' + page + '&per_page=5'

def requestGithubApi(label, language, page):
    gitUsername = os.environ['DEV_HIRING_CHALLENGE_GITHUB_USERNAME']
    gitToken = os.environ['DEV_HIRING_CHALLENGE_GITHUB_TOKEN']
    return requests.get(mountApiString(label, language, page), auth=(gitUsername, gitToken))
