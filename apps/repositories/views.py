from apps.repositories.models import Repositorie
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import RepositorieSerializer
from vocabulary.messages import couldNotPerformRepoCreation

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def repositories(request):
    try:
        if request.method == 'POST':
            return post_handler(request)

        if request.method == 'GET':
            return get_handler(request)
    except:
        return error_handler()

def post_handler(request):
    defaults = request.data.copy()
    del defaults['id']

    repositorie, _ = Repositorie.objects.update_or_create(
        id=request.data['id'],
        defaults=defaults
    )

    repositorie.users.add(request.user.id)
    return Response(RepositorieSerializer(repositorie).data)

def get_handler(request):
    repositories = request.user.repositories
    serializer = RepositorieSerializer(repositories, many=True)
    return Response(serializer.data)

def error_handler():
    response = Response({'message': couldNotPerformRepoCreation})
    response.status_code = 502
    return response
