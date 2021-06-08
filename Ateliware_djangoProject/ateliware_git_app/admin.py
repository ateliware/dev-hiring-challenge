from django.contrib import admin

# I´m Registering our models here.
from .models import TbLanguages, TbGitRepository

admin.site.register(TbLanguages)
admin.site.register(TbGitRepository)
