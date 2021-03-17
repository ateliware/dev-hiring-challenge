from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home', views.home, name='home'),
    path('repo_detail/<int:repo_id>/', views.repo_detail, name='repo_detail'),
]