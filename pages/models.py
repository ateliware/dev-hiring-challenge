import uuid
from django.db import models
from django.urls import reverse

class Git_info(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)

    full_name = models.CharField(max_length=200)
    
    description = models.CharField(max_length=200)

    login = models.CharField(max_length=200)

    html_url = models.CharField(max_length=200)

    avatar_url = models.CharField(max_length=200)

    language = models.CharField(max_length=200, default='')

    def __str__(self):
        return self.login

    def get_absolute_url(self):
        return reverse('student_detail', kwargs={'pk': str(self.pk)})
