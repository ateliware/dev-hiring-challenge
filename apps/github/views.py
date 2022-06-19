from rest_framework.response import Response
from rest_framework.decorators import api_view
from apps.vocabulary.messages import github_not_working
from apps.github.helpers import request_github_api

"""
Fetch repositories from github with query and language param
It is mandatory to pass 2 params or it will search without params
@param language :: programming language to search
@param label :: query string to search
@param page :: page number of the results to fetch
"""
@api_view(['GET'])
def get_repositories(request):
    try:
        label = request.query_params.get('label')
        language = request.query_params.get('language')
        page = request.query_params.get('page')
        return Response(request_github_api(label, language, page).json())
    except:
        response = Response({'detail': github_not_working})
        response.status_code = 502
        return response
