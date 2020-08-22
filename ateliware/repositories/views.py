import json

import requests
from django.conf import settings
from django.http import HttpResponseServerError, HttpResponseRedirect, HttpResponse
from django.shortcuts import render, resolve_url, get_object_or_404
from django.views.generic import DetailView
from django.views.generic.list import ListView

from ateliware.repositories.forms import RepositoryForm
from ateliware.repositories.models import Repository


class Index(ListView):
    template_name = 'repositories/index.html'
    model = Repository
    context_object_name = 'repositories'

    def get_queryset(self):
        repositories = Repository.objects.all()
        query: str = self.request.GET.get('q', None)

        if query is not None:
            repositories = repositories.filter(name__icontains=query)

        return repositories


class Show(DetailView):
    template_name = 'repositories/show.html'
    queryset = Repository.objects.all()
    context_object_name = 'repository'


def create(request):
    form = RepositoryForm(request.POST or None)
    if form.is_valid():
        form.save()
        return HttpResponseRedirect(resolve_url('repositories:index'))

    return HttpResponse(status=422)


def delete(request, pk=None):
    repository = get_object_or_404(Repository, pk=pk)

    if request.method == 'POST':
        repository.delete()

    return HttpResponseRedirect(resolve_url('repositories:index'))


def search(request):
    query: str = request.GET.get('q', None)

    repositories = {}
    if query is not None:
        response = requests.get(f'{settings.GITHUB_API_URL}/search/repositories?q=topic:{query}')

        if response.status_code != 200:
            return HttpResponseServerError()

        repositories = json.loads(response.text)

    return render(request, 'repositories/search.html', {'repositories': repositories.get('items', [])})
