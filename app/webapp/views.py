import requests
import json

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from html import escape
from .models import Language, Repository


# Create your views here.
#home view for select get and save repositories list for languages in database
def home(request):
   languages = Language.objects.all()
   return render(request, "main_app/home.html", {"languages": languages,
                                                 "repos_list": ''})

#getting list of repositories from github api
def getRepos(request):
    per_page  = 10
    languages = Language.objects.all()
    repos_list=[]

    for lang in languages:
        # get the list of all repositories from filtered language
        response = requests.get('https://api.github.com/search/repositories?q=language:'+ escape(lang.name) +'&page=1&per_page='+str(per_page))
        # transform the response to json objects
        all = response.json()
        list=all['items']
        repos_list.append(list)

    #saving the search in session to storage next
    request.session['repos_list'] = repos_list
    # print(repos_list)
    return render(request, "main_app/home.html", {"repos_list": repos_list,
                                                  "languages": languages})

#persiting list of repositories ind database
def saveRepos(request):
    #checking if list of repositories are in session
    if 'repos_list' in request.session:
        repos_list = request.session['repos_list']
    else:
        return HttpResponseNotFound('<h2>Ops :( algo errado aconteceu!</h2>')

    count = 0;
    for lang_repo in repos_list:
        for obj in lang_repo:
            try:
                q = Language.objects.get(name__iexact=obj['language'])
                re  = Repository(language = q,
                                            name     = obj['name'],
                                            size     = obj['size'],
                                            owner    = obj['owner']['login'],
                                            url      = obj['url'])
                re.save(force_insert=True)
                count += 1
            except Language.DoesNotExist:
                count
                #skipping language

    msg = "Foram adicionados "+ str(count) +" repositórios "
    return render(request, "main_app/save.html", {"mensagem": msg,
                                                  "repos_list" : repos_list,
                                                  "languages": Language.objects.all()})
