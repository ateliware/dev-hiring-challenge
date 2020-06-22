from django.db.models import Q
from django.views.generic import TemplateView, ListView

from .models import Git_info


class HomePageView(TemplateView):

    template_name = 'home.html'


class SearchResultsListView(ListView):
    model = Git_info
    context_object_name = 'Git_info_list'
    template_name = 'git_info_result.html'

    def get_queryset(self):
        query = self.request.GET.get('q')
        return Git_info.objects.filter(
            Q(language__icontains=query)
        )