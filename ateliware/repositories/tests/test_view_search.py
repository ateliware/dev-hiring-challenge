from django.shortcuts import resolve_url
from django.test import TestCase


class SearchRepositoriesGet(TestCase):
    def setUp(self):
        self.response = self.client.get(resolve_url('repositories:search'), {'q': 'python'})
    
    def test_template(self):
        self.assertTemplateUsed(self.response, 'repositories/search.html')
    
    def test_csrf(self):
        """Html must cotains csrf_token"""
        self.assertContains(self.response, 'csrfmiddlewaretoken')
