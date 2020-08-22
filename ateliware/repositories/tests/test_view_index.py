from django.shortcuts import resolve_url
from django.test import TestCase

from ateliware.repositories.models import Repository


class SearchRepositoriesGet(TestCase):
    def setUp(self):
        self.repository = Repository.objects.create(
            name='challenge',
            description='Ateliware hiring challenge for devs',
            language='python',
            url='https://github.com/felipefrizzo/challenge'
        )
        self.response = self.client.get(resolve_url('repositories:index'))
    
    def test_template(self):
        self.assertTemplateUsed(self.response, 'repositories/index.html')
    
    def test_context(self):
        repositories = self.response.context['repositories']
        for repository in repositories:
            with self.subTest():
                self.assertIsInstance(repository, Repository)

    def test_html(self):
        contents = (self.repository.name, self.repository.description, self.repository.url)

        for content in contents:
            with self.subTest():
                self.assertContains(self.response, content)
