from django.db import models

class Search(models.Model):
    name = models.CharField('Name', max_length=500, blank=False, null=False)
    email = models.CharField('Email', max_length=1000)
    languages = models.CharField('Languages', max_length=1000)
    date = models.DateField('Date',auto_now_add=True)