from django.test import TestCase
from webapp.models import Language

class LoginTestCase(TestCase):
    def test_login(self):
        # First check for the default behavior
        response = self.client.get('/admin/')
        self.assertRedirects(response, '/admin/login/?next=/admin/')

class SimpleTest(TestCase):
    def test_details(self):
        #redirecting case user is not authenticated
        response = self.client.get('/admin/webapp/language/')
        self.assertEqual(response.status_code, 302)
    def test_index(self):
        #checking index of application is ok
        response = self.client.get('')
        self.assertEqual(response.status_code, 200)

class LanguageTestCase(TestCase):
    def setUp(self):
        Language.objects.create(name="C++", active=True)
        Language.objects.create(name="C#", active=True)
        Language.objects.create(name="Java", active=False)

    def test_language_has_escape_characters(self):
        """Languages that hava escape characters"""
        c_dot  = Language.objects.get(name="C++")
        c_sharp= Language.objects.get(name="C#")
        java   = Language.objects.get(name="Java")
        self.assertEqual(c_dot.has_some_signal, True)
        self.assertEqual(c_sharp.has_some_signal, True)
        self.assertEqual(java.has_some_signal, False)
