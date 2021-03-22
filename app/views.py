from django.shortcuts import render
from django.http import Http404

import requests

from .models import Repo


LANGUAGES = ('java', 'python', 'ruby', 'rust', 'go')


def home(request):
    # print('home')
    if request.GET:
        if 'Atualizar' in request.GET.get('enviar'):
            load_repos()
        elif 'Limpar' in request.GET.get('enviar'):
            delete_repos()
    all_repos = Repo.objects.all().order_by('-stars')
    return render(request, 'home.html', {"repos": all_repos})


def load_repos():
    # print('home:load_repos')
    Repo.objects.all().delete()
    try:
        for language in LANGUAGES:
            url = 'https://api.github.com/search/repositories?q=language:' + language + '&sort=stars&order=desc'
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
    except KeyError:
        raise Http404('API rate limit exceeded, please wait before updating again.')


def delete_repos():
    # print('home:delete_repos')
    Repo.objects.all().delete()


def repo_detail(request, repo_id):
    # print('get_repo')
    try:
        repo = Repo.objects.get(id=repo_id)
    except Repo.DoesNotExist:
        raise Http404('repo not found')
    return render(request, 'repo_detail.html', {'repo': repo})
