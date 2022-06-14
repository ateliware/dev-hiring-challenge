from rest_framework.urls import path
from . import views

urlpatterns = [
    path('', views.ListCreateAPIView.as_view(), name='get_post_repositories')
]
