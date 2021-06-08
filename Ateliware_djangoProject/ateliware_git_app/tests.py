from django.test import TestCase
from selenium import webdriver
from .ateliware_git_api import GitAPI
# Automatic tests for this awesome project!


class FunctionalTestCases(TestCase):
    """
    Such class makes functional testes for front-end functionalities, for example pressing search repositories button
    """
    def setUp(self):
        self.browser = webdriver.Chrome()

    def test_home_page(self):
        """
        This test homepage oppening process
        """
        self.browser.get('http://127.0.0.1:8000')
        self.assertIn('Encontrar Repositórios Destaques em: CSS, HTML, Python, JS, Flutter', self.browser.page_source)


class UnitTestCases(TestCase):
    """
    UnitTestCases tests back-end functionalities to assure front-end operations, for exemple:
    Database tests;

    """

    def test_github_class_template(self):
        """
        Makes a test to validate template
        """
        self.assertTrue(GitAPI([]).git_api)

    def test_database(self):
        """
        Tests database connection by selecting all values from a table
        """
        self.assertTrue(GitAPI([]).tb_repo.objects.all().values_list())
