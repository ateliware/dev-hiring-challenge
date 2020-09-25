from dados import Dados
import requests

def test__name():
    assert len(Dados("Python").get_informacao(1, "name")) > 1


def test_forks():
    assert len(Dados("Python").get_informacao(1, "description")) > 1


def test_pesquisar():
    assert Dados('Python').pesquisar() is not None
