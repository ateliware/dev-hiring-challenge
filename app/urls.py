from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('load_repos', views.load_repos, name='load_repos'),
    path('delete_repos', views.delete_repos, name='delete_repos'),
    path('repo_detail/<int:repo_id>/', views.get_repo, name='repo_detail'),
]