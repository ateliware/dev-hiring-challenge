from django.shortcuts import render, redirect, get_object_or_404
from .models import Repositorio
from .main import atualizar
from .forms import Linguagens


def formulario(request):
    dados = []
    context = {}
    if request.method == 'GET':
        context['form'] = Linguagens()
        return render(request, 'atelieware/index.html', context)
    else:
        form = Linguagens(request.POST)
        if form.is_valid():
            campos = request.POST
            dados.append(campos.get("primeira"))
            dados.append(campos.get("segunda"))
            dados.append(campos.get("terceira"))
            dados.append(campos.get("quarta"))
            dados.append(campos.get("quinta"))
            atualizar(dados)
            resultado = Repositorio.objects.all()
            context = {
                    "object_list": resultado
                    }
            return render(request, 'atelieware/resultado.html', context)



# Create your views here.
