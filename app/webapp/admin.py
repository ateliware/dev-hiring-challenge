from django.contrib import admin

# Register your models here.
from .models import Language, Repository

class LanguageAdmin(admin.ModelAdmin):
    list_display  = ('name', 'active')
    search_fields = ['name']
    list_per_page = 30
    # actions = None

class RepositoryAdmin(admin.ModelAdmin):
    list_display  = ('name', 'language', 'url', 'saved_at')
    search_fields = ['name']
    list_filter   = ['language']
    list_per_page = 30
    # actions = None

admin.site.register(Language, LanguageAdmin)
admin.site.register(Repository, RepositoryAdmin)
