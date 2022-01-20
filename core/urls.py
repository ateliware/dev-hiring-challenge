from django.contrib import admin

from django.urls import include
from django.urls import path

from core.github import urls as github_urls

urlpatterns = [
    path("", include(github_urls)),
]
