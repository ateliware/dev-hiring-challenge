from django.urls import path

from core.github.views import index


urlpatterns = [
    path("", view=index, name="index")
]
