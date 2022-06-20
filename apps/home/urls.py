from django.urls import path
from apps.home.views import home


urlpatterns = [
    path('', home),
]
