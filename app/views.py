from django.shortcuts import render, HttpResponse
import requests
import json


def index(request):
    # todo
    user = requests.get('https://api.github.com/users/biankatpas')
    content = user.text
    return HttpResponse(content)
