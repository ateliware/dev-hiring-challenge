from django.urls import path

from ateliware.repositories.views import (
    create,
    delete,
    Index,
    Show,
    search
)

app_name = 'repositories'
urlpatterns = [
    path('', search, name='search'),
    path('repositories', Index.as_view(), name='index'),
    path('repositories/<int:pk>', Show.as_view(), name='show'),
    path('repositories/create', create, name='create'),
    path('repositories/delete/<int:pk>', delete, name='delete'),
]