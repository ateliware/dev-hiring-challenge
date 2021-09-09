from ssl import get_protocol_name
from django.http import HttpResponse
import urllib.request
import json
from ..data import GetRepositoriesListFromGitHub
from types import SimpleNamespace
from django.utils.http import urlencode
from ..models import Search

baseUrl = "https://api.github.com/search/repositories?"

def GetRepos(form, howMuchPerLanguage = 0):
    #  form.cleaned_data['name'] + form.cleaned_data['email'] + form.cleaned_data['languages']
    Search.objects.create(name=form.cleaned_data['name'], email=form.cleaned_data['email'], languages=form.cleaned_data['languages'])
    repos = []
    for l in form.cleaned_data['languages'].split(" "):
        lang = {'q' : ('language:' + l) }    
        url = baseUrl + urlencode(lang)
        print(url)
        serialized_data =  urllib.request.urlopen(url).read()
        data = json.loads(serialized_data, object_hook=lambda d: SimpleNamespace(**d))
        response = GetRepositoriesListFromGitHub(data)
        count = 0
        for repo in response:
            if count >= howMuchPerLanguage:
                break
            repos.append(repo)            
            count += 1

    return repos