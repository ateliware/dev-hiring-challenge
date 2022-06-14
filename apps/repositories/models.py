from django.db import models

class Repositorie(models.Model):
    fullname = models.CharField(max_length=100)
    html_url = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    created_at = models.CharField(max_length=100)
    creator = models.ForeignKey('auth.User', related_name='repositories', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']
