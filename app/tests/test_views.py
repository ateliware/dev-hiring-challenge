from django.test import TestCase
from django.urls import reverse

from ..models import Repo


class TestHomeView(TestCase):
    @classmethod
    def setUpTestData(cls):
        number_of_repos = 13

        for repo_id in range(number_of_repos):
            Repo.objects.create(
                name=f'repo {repo_id}',
                language='Java',
                stars=100 + repo_id,
                forks=20 + repo_id,
                description=f'test repo {repo_id}',
                url=f'test{repo_id}.com',
            )

    def test_view_url_accessible_by_name(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'home.html')

    def test_lists_all_repos(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.context['repos']) == 13)


class TestGetRepoView(TestCase):
    @classmethod
    def setUpTestData(cls):
        number_of_repos = 13

        for repo_id in range(number_of_repos):
            Repo.objects.create(
                name=f'repo {repo_id}',
                language='Java',
                stars=100 + repo_id,
                forks=20 + repo_id,
                description=f'test repo {repo_id}',
                url=f'test{repo_id}.com',
            )

    def test_view_url_accessible_by_name(self):
        response = self.client.get(reverse('repo_detail', kwargs={'repo_id': 1}))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('repo_detail', kwargs={'repo_id': 1}))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'repo_detail.html')

    def test_get_repo(self):
        response = self.client.get(reverse('repo_detail', kwargs={'repo_id': 1}))
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.context['repo'], Repo)
        self.assertEquals(response.context['repo'].name, 'repo 0')
        self.assertEquals(response.context['repo'].language, 'Java')
        self.assertEquals(response.context['repo'].stars, 100)
        self.assertEquals(response.context['repo'].forks, 20)
        self.assertEquals(response.context['repo'].description, 'test repo 0')
        self.assertEquals(response.context['repo'].url, 'test0.com')

        response = self.client.get(reverse('repo_detail', kwargs={'repo_id': 14}))
        self.assertEqual(response.status_code, 404)
