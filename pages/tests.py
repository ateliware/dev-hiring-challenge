from django.test import Client, TestCase, SimpleTestCase
from django.urls import reverse, resolve

from .models import Git_info

from .views import HomePageView


class HomepageTests(SimpleTestCase):

    def setUp(self):
        url = reverse('home')
        self.response = self.client.get(url)

    def test_homepage_status_code(self):
        self.assertEqual(self.response.status_code, 200)

    def test_homepage_template(self):
        self.assertTemplateUsed(self.response, 'home.html')


    def test_homepage_does_not_contain_incorrect_html(self):
        self.assertNotContains(
            self.response, 'Hi there! I should not be on the page.')

    def test_homepage_url_resolves_homepageview(self): 
        view = resolve('/')
        self.assertEqual(
            view.func.__name__,
            HomePageView.as_view().__name__
        )



class GitInfoTests(TestCase):

    def setUp(self):
        self.Git_info = Git_info.objects.create(
            full_name='desafio_dev',
            description='repositório',
            login='desafio_dev',
            html_url='github.com',
            avatar_url='github.com',
            language='Python'
        )

    def test_Gitinfo_listing(self):
        self.assertEqual(f'{self.Git_info.full_name}', 'desafio_dev')
        self.assertEqual(f'{self.Git_info.description}', 'repositório')
        self.assertEqual(f'{self.Git_info.login}', 'desafio_dev')
        self.assertEqual(f'{self.Git_info.html_url}', 'github.com')
        self.assertEqual(f'{self.Git_info.avatar_url}', 'github.com')
        self.assertEqual(f'{self.Git_info.language}', 'Python')

