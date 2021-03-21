from django.test import TestCase

from ..models import Repo


class RepoModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Repo.objects.create(
            name='repo name',
            language='Java',
            stars=100,
            forks=20,
            description='test repo',
            url='test.com',
        )

    def test_create(self):
        Repo.objects.create(
            name='other',
            language='Python',
            stars=2,
            forks=0,
            description='test repo 2',
            url='test2.com',
        )

        repo = Repo.objects.get(id=2)
        self.assertIsInstance(repo, Repo)
        self.assertEquals(repo.name, 'other')

    def test_get(self):
        repo = Repo.objects.get(id=1)
        self.assertIsInstance(repo, Repo)

    def test_name(self):
        repo = Repo.objects.get(id=1)
        self.assertEquals(repo.name, 'repo name')

    def test_language(self):
        repo = Repo.objects.get(id=1)
        self.assertEquals(repo.language, 'Java')

    def test_stars(self):
        repo = Repo.objects.get(id=1)
        self.assertEquals(repo.stars, 100)

    def test_forks(self):
        repo = Repo.objects.get(id=1)
        self.assertEquals(repo.forks, 20)

    def test_description(self):
        repo = Repo.objects.get(id=1)
        self.assertEquals(repo.description, 'test repo')

    def test_url(self):
        repo = Repo.objects.get(id=1)
        self.assertEquals(repo.url, 'test.com')
