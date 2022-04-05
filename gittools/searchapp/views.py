# from django.http import HttpResponse
import requests

from django.shortcuts import render, redirect
from django.utils import timezone

from .models import GitRepo


def index(request):
    # Response vars
    programming_lang = None
    git_response = []

    # Search button is pressed
    if request.method == 'POST':
        if 'search_lang_button_pressed' in request.POST:

            # Collect 'programming_lang' response var
            if 'programming_lang' in request.POST:
                programming_lang = request.POST['programming_lang']

                # A language has been chosen
                if programming_lang != 'None':

                    # Collect 'git_response' response var
                    git_response = index_get_git_response_items(
                        requests.get(
                            'https://api.github.com/search/repositories?' +
                            'q=language:{}&sort=stars'
                            .format(programming_lang)
                        ).json()
                    )

    return render(
        request,
        'searchapp/index.html',
        {
            'programming_lang': programming_lang,
            'git_response': git_response,
            'repo_save': False,
            'existing_repositories': [x.name for x in GitRepo.objects.all()],
        }
    )

def index_get_git_response_items(response_dict: dict) -> list:
    git_response = []
    
    # Filter properties of 'git_response' items
    for repo in response_dict['items']:

        # Description len
        if repo['description']:
            description = (
                repo['description']
                if len(repo['description']) < 75
                else repo['description'][:72] + '...'
            )
        else:
            description = 'Without description'  # pragma: no cover
        
        # Collect 'git_response' response var
        git_response.append({
            'id': repo['id'],
            'name': repo['name'],
            'stargazers_count': repo['stargazers_count'],
            'description': description,
            'html_url': repo['html_url'],
        })

    return git_response


def infosave(request):
    # Response vars
    repo_save = False
    existing_repositories = [x.name for x in GitRepo.objects.all()]

    # Save button is pressed
    if request.method == 'POST':
        if 'save_button_pressed' in request.POST:

            # When some repository is chosen
            for request_post in request.POST:

                # Filter unsaved repositories and save
                if 'repository✱' in request_post[:len('repository✱')]:
                    (
                        _prefix,
                        repo_id,
                        repo_name,
                        repo_lang,
                        repo_description,
                        repo_stargazers_count,
                        repo_html_url
                    ) = request_post.split('✱')
                    
                    if repo_name not in existing_repositories:
                        gr = GitRepo(
                            name=repo_name,
                            _id=int(repo_id),
                            lang=repo_lang,
                            description=repo_description,
                            stargazers_count=repo_stargazers_count,
                            html_url=repo_html_url,
                            pub_date=timezone.now())

                        gr.save()
                        repo_save = True
            
            return render(request, 'searchapp/infosave.html', {
                'repo_save': repo_save,
                'existing_repositories': existing_repositories,
            })

    # Redirect direct access
    return redirect(index)


def saved(request):
    # Response var
    existing_repositories = []

    # Sort repositories alphabetically, based on language
    for language in ['C', 'Elixir', 'PHP', 'Python', 'Rust']:
        for repo in GitRepo.objects.all():  # Lazy :)
            if repo.lang == language:
                
                # Collect 'existing_repositories' response var
                existing_repositories.append(
                    {
                        'id': repo.id,
                        'lang': repo.lang,
                        'space_decoration': ('_________')[:9 - len(repo.lang)],
                        'name': repo.name,
                        'space_description': '_' * 11,
                        'stargazers_count': repo.stargazers_count,
                        'html_url': repo.html_url,
                        'description': (
                            repo.description if len(repo.description) < 60
                            else repo.description[:57] + '...'
                        ),
                    }
                )

    return render(request, 'searchapp/saved.html', {
        'existing_repositories': existing_repositories,
    })


def inforemove(request):
    # Response var
    repo_remove = False

    # Remove button is pressed
    if request.method == 'POST':
        if 'remove_button_pressed' in request.POST:

            # When some repository is chosen
            for request_post in request.POST:
                if 'repository✱' in request_post[:len('repository✱')]:
                    _prefix, repository_name = request_post.split('✱')

                    # Remove
                    gr = GitRepo.objects.get(name=repository_name)
                    gr.delete()
                    repo_remove = True

            return render(request, 'searchapp/inforemove.html', {
                'repo_remove': repo_remove,
            })

    # Redirect direct access
    return redirect(index)
