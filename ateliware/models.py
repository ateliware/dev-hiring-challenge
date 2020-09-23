from django.db import models

# Create your models here.


class Repositorio(models.Model):
    language = models.TextField("Linguagem")
    name = models.TextField("Nome")
    description = models.TextField("Descrição")
    stars = models.TextField("Estrelas")
    forks = models.TextField("Forks")
    issues = models.TextField("Open Issues")
    url = models.TextField("Endereço")
    
    def __str__(self):
        return self.name
    

