from django import forms


class Linguagens(forms.Form):

    primeira = forms.CharField(max_length=200, label="Primeira")
    segunda = forms.CharField(max_length=200, label="Segunda")
    terceira = forms.CharField(max_length=200, label="Terceira")
    quarta = forms.CharField(max_length=200, label="Quarta")
    quinta = forms.CharField(max_length=200, label="Quinta")

class Pesquisar(forms.Form):
    pesquisa = forms.CharField(max_length=200, label="Pesquisa")
