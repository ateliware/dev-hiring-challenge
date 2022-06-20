from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('apps.home.urls')),
    path('admin/', admin.site.urls),
    path('api/v1/github/repositories/', include('apps.github.urls'), name='api_github'),
    path('api/v1/repositories/', include('apps.repositories.urls'), name='repositories'),
    path('api/v1/auth/', include('apps.authentication.urls'), name='auth_user'),
]
