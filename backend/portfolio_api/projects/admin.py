from django.contrib import admin
from .models import Project, ProjectComment

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'featured', 'views_count', 'created_at']
    list_filter = ['featured', 'created_at']
    search_fields = ['title', 'description']

@admin.register(ProjectComment)
class ProjectCommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'project', 'created_at']
    list_filter = ['created_at']
    search_fields = ['content', 'user__username']
