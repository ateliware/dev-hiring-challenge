from django.shortcuts import render
from django.http import HttpResponse, Http404

import requests
import json

from .models import Repo


def home(request):
    Repo.objects.all().delete()
    # todo
    language = ['java', 'ruby', 'python', 'c++', 'kotlin']
    all_repos = {}
    # for l in language:
    # url =
    # 'https://api.github.com/search/repositories?
    # q=%s
    # ' % l'
    url = 'https://api.github.com/search/repositories?q=language:python&sort=stars&order=desc'
    response = requests.get(url)
    data = response.json()
    repos = data['items']
    for i in repos:
        repo_data = Repo(
            name=i['name'],
            language=i['language'],
            stars=i['stargazers_count'],
            forks=i['forks_count'],
            description=i['description'],
            url=i['html_url'],
        )
        repo_data.save()
        all_repos = Repo.objects.all().order_by('-stars')

    return render(request, 'home.html', {
        "repos": all_repos,
    })


def repo_detail(request, repo_id):
    try:
        repo = Repo.objects.get(id=repo_id)
    except Repo.DoesNotExist:
        raise Http404('repo not found')
    return render(request, 'repo_detail.html', {
        'repo': repo,
    })
