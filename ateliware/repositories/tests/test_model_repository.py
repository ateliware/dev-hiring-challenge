from django.test import TestCase
from django.utils.translation import ugettext_lazy as _

from ateliware.repositories.models import Repository


class RepositoryModelTest(TestCase):
    def setUp(self):
        self.repository = Repository.objects.create(
            name='challenge',
            description='Ateliware hiring challenge for devs',
            language='python',
            url='https://github.com/felipefrizzo/challenge',
            avatar_url='https://github.com/felipefrizzo/challenge'
        )
    
    def test_create(self):
        self.assertTrue(Repository.objects.exists())
    
    def test_verbose_name(self):
        self.assertEqual(str(Repository._meta.verbose_name), _('repository'))

    def test_verbose_name_plural(self):
        self.assertEqual(str(Repository._meta.verbose_name_plural), _('repositories'))

    def test_ordering(self):
        self.assertEqual(Repository._meta.ordering, ['pk', 'name', 'language'])
