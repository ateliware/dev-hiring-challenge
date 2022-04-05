import requests

from django.test import TestCase
from django.utils import timezone

from ..models import GitRepo
from ..views import index_get_git_response_items


class ModelsTests(TestCase):
    """"""
    def setUp(self):
        GitRepo.objects.create(
            name="Python-test", 
            _id=1,
            lang="Python",
            description="Python test",
            stargazers_count="1000",
            html_url="https://python.com/url",
            pub_date=timezone.now()
        )
        GitRepo.objects.create(
            name="C++test", 
            _id=2,
            lang="C++",
            description="C++ test",
            stargazers_count="1001",
            html_url="https://C++.com/url",
            pub_date=timezone.now()
        )
        GitRepo.objects.create(
            name="PHPtest", 
            _id=2,
            lang="PHP",
            stargazers_count="1002",
            html_url="https://PHP.com/url",
            pub_date=timezone.now()
        )

    def tearDown(self):
        py = GitRepo.objects.get(name="Python-test")
        py.delete()

        cpp = GitRepo.objects.get(name="C++test")
        cpp.delete()

        php = GitRepo.objects.get(name="PHPtest")
        php.delete()

    def test_stargazers_count(self):
        """"""
        py = GitRepo.objects.get(name="Python-test")
        self.assertEqual(py.stargazers_count, '1000')

    def test_object_str(self):
        cpp = GitRepo.objects.get(name="C++test")
        self.assertEqual(str(cpp), 'C++test')

    def test_null_field(self):
        php = GitRepo.objects.get(name="PHPtest")
        self.assertEqual(php.description, None)

    def test_description(self):
        rq = requests.get(
            'https://api.github.com/search/repositories?' +
            'q=language:Python&sort=stars'
        ).json()
        response = index_get_git_response_items(rq)

        for repo in rq['items']:
            if 'description' not in repo:
                for resp in response:
                    if resp['name'] == repo['name']:
                        self.assertEqual(resp['description'], 'Without description')
                        break

        self.assertNotEqual(response[0]['description'], 'Without description')
