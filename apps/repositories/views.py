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
            return postHandler(request)

        if request.method == 'GET':
            return getHandler(request)
    except:
        return errorHandler()

def postHandler(request):
    defaults = request.data.copy()
    del defaults['id']

    repositorie, _ = Repositorie.objects.update_or_create(
        id=request.data['id'],
        defaults=defaults
    )

    repositorie.users.add(request.user.id)
    return Response(RepositorieSerializer(repositorie).data)

def getHandler(request):
    repositories = request.user.repositories
    serializer = RepositorieSerializer(repositories, many=True)
    return Response(serializer.data)

def errorHandler():
    response = Response({'message': couldNotPerformRepoCreation})
    response.status_code = 502
    return response
