import requests
import json


class Dados():
    def __init__(self, linguagem, sort="star", order="desc"):
        self.__linguagem = linguagem
        self.__link = ""
        self.__informacao = {}
        self.__sort = sort
        self.__order = order
        self.pesquisar()
        self.set_informacao()

    def pesquisar(self):
        self.__link = "https://api.github.com/search/repositories?q={0}&sort={1}&order={2}"
        self.__link.format(self.__linguagem, self.__sort, self.__order)
        return requests.get(self.__link).text

    def get_informacao(self, numero, campo):
        return self.__informacao["items"][numero][campo]

    def formatar(self, informacao):
        return json.loads(informacao)

    def set_informacao(self):
        informacao = self.pesquisar()
        self.__informacao = self.formatar(informacao)
