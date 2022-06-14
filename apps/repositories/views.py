from rest_framework.generics import ListCreateAPIView
from .models import Repositorie
from .serializers import RepositorieSerializer

class ListCreateRepositorieAPIView(ListCreateAPIView):
    serializer_class = RepositorieSerializer
    queryset = Repositorie.objects.all()
    authentication_classes = ()
    permission_classes = ()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
