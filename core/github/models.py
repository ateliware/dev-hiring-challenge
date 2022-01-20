from django.db.models import Model
from django.db.models import IntegerField
from django.db.models import TextField
from django.db.models import URLField
from django.db.models import ForeignKey
from django.db.models import FloatField
from django.db.models import CASCADE

from django.db.models import Manager


class Linguagem(Model):
    nome = TextField()
    objects = Manager()

    def __str__(self):
        return str(self.nome)

    class Meta:
        db_table = "linguagens"
        verbose_name = "Linguagem"
        verbose_name_plural = "Linguagens"


class Repositorio(Model):
    nome = TextField()
    url = URLField()
    estrelas = IntegerField()
    pontos = FloatField()
    acompanhadores = IntegerField()
    licenca = TextField()
    descricao = TextField(null=True)
    linguagem = ForeignKey(Linguagem, on_delete=CASCADE)
    objects = Manager()

    def __str__(self):
        return str(self.nome)

    class Meta:
        db_table = "repositorios"
        verbose_name = "Repositório"
        verbose_name_plural = "Repositórios"