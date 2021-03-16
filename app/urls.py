from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('app/repo_detail/<int:repo_id>/', views.repo_detail, name='repo_detail'),
]