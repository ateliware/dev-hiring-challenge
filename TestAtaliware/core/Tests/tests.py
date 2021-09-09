from django.test import TestCase
from ..models import Search
from core.Controllers.SearchController import GetPreferedLanguages

# Create your tests here.
class SearchTest(TestCase):
    def setUp(self):
        Search.objects.create(name='Teste Name', email='email@teste.com', languages='C C# C++')
        Search.objects.create(name='Teste Name 2', email='email@teste2.com', languages='C C# Z')
        Search.objects.create(name='Teste Name 3', email='email@teste3.com', languages='C F M')

    def test_CreateData(self):
        search = Search.objects.get(name='Teste Name') 
        self.assertTrue(search)
        
    def test_PreferedLanguages(self):
        searchs = Search.objects.all()
        langs = GetPreferedLanguages(3, searchs)

        preferedLangs = ''
        for s in langs:
            preferedLangs += s.value + ' '
        self.assertEqual(preferedLangs, 'C C# C++ ')
