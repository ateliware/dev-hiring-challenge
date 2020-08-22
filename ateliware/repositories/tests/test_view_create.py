from django.shortcuts import resolve_url
from django.test import TestCase

from ateliware.repositories.models import Repository


class CreateRepositoriesPost(TestCase):
    def setUp(self):
        data = dict(
            name='challenge',
            description='Ateliware hiring challenge for devs',
            language='python',
            url='https://github.com/felipefrizzo/challenge',
            avatar_url='https://github.com/felipefrizzo/challenge',
            stars=0, watchers=0, forks=0
        )
        self.response = self.client.post(resolve_url('repositories:create'), data)
    
    def test_post(self):
        """
        Valid POST should redirect to /repositories/
        """
        self.assertRedirects(self.response, resolve_url('repositories:index'))
    
    def test_create(self):
        self.assertTrue(Repository.objects.exists())


class CreateRepositoriesInvalidPost(TestCase):
    def setUp(self):
        data = dict(
            name='challenge',
            description='Ateliware hiring challenge for devs',
            language='python',
            url='https://github.com/felipefrizzo/challenge',
            avatar_url='https://github.com/felipefrizzo/challenge'
        )
        self.response = self.client.post(resolve_url('repositories:create'), data)
    
    def test_post(self):
        """
        Invalid POST should return status 422
        """
        self.assertEqual(self.response.status_code, 422)
    
    def test_create(self):
        self.assertFalse(Repository.objects.exists())
