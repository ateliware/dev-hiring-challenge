from rest_framework.response import Response
from rest_framework.decorators import api_view
from apps.vocabulary.messages import githubNotWorking
from apps.github.helpers import requestGithubApi

"""
Fetch repositories from github with query and language param
It is mandatory to pass 2 params or it will search without params
@param language :: programming language to search
@param label :: query string to search
@param page :: page number of the results to fetch
"""
@api_view(['GET'])
def getRepositories(request):
    try:
        label = request.query_params.get('label')
        language = request.query_params.get('language')
        page = request.query_params.get('page')
        return Response(requestGithubApi(label, language, page).json())
    except:
        response = Response({'message': githubNotWorking})
        response.status_code = 502
        return response
