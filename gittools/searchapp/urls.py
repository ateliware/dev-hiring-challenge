from django.urls import path

from . import views

urlpatterns = [
    # index
    path('', views.index, name='index'),

    # Saved
    path('saved', views.saved, name='saved'),
    path('saved/', views.saved, name='saved'),

    # Save info
    path('infosave', views.infosave, name='infosave'),
    path('infosave/', views.infosave, name='infosave'),

    # Remove info
    path('inforemove', views.inforemove, name='inforemove'),
    path('inforemove/', views.inforemove, name='inforemove'),
]
