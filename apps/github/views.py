from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from apps.vocabulary.messages import githubNotWorking
from apps.github.helpers import requestGithubApi

"""
Fetch repositories from github with query and language param
It is mandatory to pass 2 params or it will search without params
@param language :: programming language to search
@param label :: query string to search
"""
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRepositories(request):
    try:
        label = request.query_params.get('label')
        language = request.query_params.get('language')
        return Response(requestGithubApi(label, language).json())
    except:
        response = Response({'message': githubNotWorking})
        response.status_code = 502
        return response


   
