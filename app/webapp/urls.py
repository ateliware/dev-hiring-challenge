from django.conf import settings
from django.conf.urls.static import static
from django.urls import path


from . import views

app_name = 'webapp'
urlpatterns = [
    path('', views.home, name='home'),
    path('getRepos', views.getRepos, name='getRepos'),
    path('saveRepos', views.saveRepos, name='saveRepos'),
]
