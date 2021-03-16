from django.db import models


class Repo(models.Model):
    name = models.CharField(max_length=100)
    language = models.CharField(max_length=30)
    description = models.TextField(null=True)
    stars = models.IntegerField(null=True)
    forks = models.IntegerField(null=True)
    url = models.CharField(max_length=140)
