from io import DEFAULT_BUFFER_SIZE
from django.shortcuts import render
from .forms import Languages
import os
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from core.Controllers.GitHubRepoController import GetRepos
from core.Controllers.SearchController import GetPreferedLanguages
from .models import Search

# Create your views here.
@csrf_exempt
def index(request):
    searchs = Search.objects.all()

    repos = []
    preferedLanguages = GetPreferedLanguages(3, searchs)

    if request.method == 'POST':
        print('post')
        form = Languages(request.POST)
        if form.is_valid():
            repos.extend(GetRepos(form, 2))

    data = {
        'preferedLanguages' : preferedLanguages,
        'Repos' : repos
    }

    return render(request, 'core/index.html', data)    

def login(request):
    return render(request, 'core/login.html')    

def subscribe(request):
    return render(request, 'core/subscribe.html')  
