from django import forms

from ateliware.repositories.models import Repository


class RepositoryForm(forms.ModelForm):
    class Meta:
        model = Repository
        fields = '__all__'
