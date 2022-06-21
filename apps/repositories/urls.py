from django.urls import path
from . import views

urlpatterns = [
    path('', views.repositories, name='get_post_repositories')
]
