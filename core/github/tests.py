from requests import get

from django.test import TestCase
from django.test import Client

from core.settings import URL_API_GITHUB

from core.github.models import Linguagem as LinguagemModel
from core.github.models import Repositorio as RepositorioModel

from core.github.services import fetch_repositorios_por_linguagem


class Repositorio(TestCase):

    def setUp(self):
        self.linguagem = LinguagemModel.objects.create(nome="Python")

        self.repositorio_data = {
            "nome": "ateliware/dev-hiring-challenge",
            "url": "https://github.com/ateliware/dev-hiring-challenge",
            "estrelas": 600000,
            "acompanhadores": 1000000,
            "pontos": 10.0,
            "licenca": "MSL - Mega Super Licença",
            "descricao": "O melhor repositório que já existiu em toda a vida",
        }

        self.cliente = Client()


    def test_cadastro_repositorio(self):
        RepositorioModel.objects.create(
            **self.repositorio_data,
            linguagem=self.linguagem
        )

        repositorios = RepositorioModel.objects.count()
        
        self.assertEqual(repositorios, 1)


    def test_listagem_respotorios(self):
        repositorios = fetch_repositorios_por_linguagem(self.linguagem.nome)

        self.assertNotEqual(
            tuple(repositorios), 0
        )

    def test_pagina_inicial(self):
        response = self.cliente.get("/")

        self.assertEqual(response.status_code, 200)

    def test_pagina_repositorios(self):
        response = self.cliente.post("/")

        self.assertEqual(response.status_code, 200)
