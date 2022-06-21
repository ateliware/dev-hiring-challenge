from rest_framework.decorators import api_view
from django.shortcuts import render

@api_view(['GET'])
def home(request):
    return render(request, 'index.html')
