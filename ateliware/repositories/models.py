from django.db import models
from django.utils.translation import gettext_lazy as _


class Repository(models.Model):
    name = models.CharField(_('name'), max_length=255)
    description = models.CharField(_('description'), max_length=255)
    language = models.CharField(_('language'), max_length=255)
    stars = models.IntegerField(_('stars'), default=0)
    watchers = models.IntegerField(_('watchers'), default=0)
    forks = models.IntegerField(_('forks'), default=0)
    url = models.URLField(_('url'), max_length=255)
    avatar_url = models.URLField(_('avatar_url'), max_length=255)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True, auto_now=False)
    updated_at = models.DateTimeField(_('updated at'), auto_now_add=False, auto_now=True)

    class Meta:
        ordering = ['pk', 'name', 'language']
        verbose_name = _('repository')
        verbose_name_plural = _('repositories')
    
    def __str__(self):
        return self.name