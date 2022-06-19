from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Repositorie

class RepositorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repositorie
        fields = ('id', 'full_name', 'html_url', 'description', 'created_at', 'users')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'repositories')
