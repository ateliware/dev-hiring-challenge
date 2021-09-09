from django import forms

class Languages(forms.Form):
    name = forms.CharField(label='name')
    email = forms.CharField(label='email')
    languages = forms.CharField(label='languages')
