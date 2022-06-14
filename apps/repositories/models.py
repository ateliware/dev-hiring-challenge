from django.contrib.auth.models import User
from django.db import models

class Repositorie(models.Model):
    fullname = models.CharField(max_length=100)
    html_url = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    created_at = models.CharField(max_length=100)
    users = models.ManyToManyField(User, related_name="repositories")

    def __str__(self):
        return self.html_url
