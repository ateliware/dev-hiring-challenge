from requests import get

from core.github.models import Linguagem as LinguagemModel

from core.settings import URL_API_GITHUB


def fetch_repositorios_por_linguagem(linguagem: str):

    q = f"language:{linguagem.lower()}"

    parametros = {
        "q": q
    }

    url = f"{URL_API_GITHUB}/search/repositories"

    response = get(url, params=parametros)

    if response.status_code != 200:
        response.raise_for_status()
    
    json = response.json()

    return json["items"]


def fetch_repositorios():
    linguagens = LinguagemModel.objects.all()

    for linguagem in linguagens:
        repositorios = fetch_repositorios_por_linguagem(linguagem.nome)

        for repositorio in repositorios:
            yield {
                "nome": repositorio["name"],
                "url": repositorio["html_url"],
                "estrelas": repositorio["stargazers_count"],
                "acompanhadores": repositorio["watchers"],
                "pontos": repositorio["score"],
                "descricao": repositorio["description"],
                "linguagem": linguagem,
            }
