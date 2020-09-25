from .models import Repositorio
from .dados import Dados


def atualizar(linguagens) -> Repositorio:

    Repositorio.objects.all().delete()

    for language in linguagens:
        projetos = Dados(language)
        for numero in range(0, 4):
            name = projetos.get_informacao(numero, "name")
            description = projetos.get_informacao(numero, "description")
            stars = projetos.get_informacao(numero, "stargazers_count")
            forks = projetos.get_informacao(numero, "forks")
            open_issues = projetos.get_informacao(numero, "open_issues")
            url = projetos.get_informacao(numero, "html_url")
            informacao = Repositorio.objects.create(language=language, name=name, description=description, stars=stars, forks=forks, issues=open_issues, url=url)
            informacao.save()


