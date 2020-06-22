from django.urls import path

from .views import  HomePageView, SearchResultsListView

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('search/', SearchResultsListView.as_view(), name='search_results')
]