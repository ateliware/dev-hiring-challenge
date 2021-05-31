from django.db import models

import datetime
from django.utils import timezone

# Create your models here.
class Language(models.Model):
    name   = models.CharField('Linguagem', max_length=50)
    active = models.BooleanField('Ativo', default=True)

    class Meta:
        verbose_name = "Linguagem"
        verbose_name_plural = "Linguagens"

    def has_some_signal(self):
        regex = re.compile('[+@_!#$%^&*()<>?/\|}{~:]')
        return (regex.search(string) == None)

    def __str__(self):
        return self.name


class Repository(models.Model):
    """
    Class for maintain data in database
    """
    language = models.ForeignKey(Language, on_delete=models.PROTECT)
    name     = models.CharField('Repositório', max_length=100)
    owner    = models.CharField('Proprietário Login', max_length=100)
    saved_at = models.DateTimeField('Salvo em', default=timezone.now)
    size     = models.IntegerField('Score', default=0)
    url      = models.URLField('Url', max_length=100)

    class Meta:
        verbose_name = "Repositório"

    def __str__(self):
        return self.owner
