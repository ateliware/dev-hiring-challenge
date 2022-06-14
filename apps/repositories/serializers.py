from rest_framework import serializers
from .models import Repositorie
from django.contrib.auth.models import User

class RepositorieSerializer(serializers.Serializer):
    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        model = Repositorie
        fields = ('id', 'fullname', 'html_url', 'description', 'created_at', 'creator')

class UserSerializer(serializers.Serializer):
    repositories = serializers.PrimaryKeyRelatedField(many=True, queryset=Repositorie.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'repositories')
