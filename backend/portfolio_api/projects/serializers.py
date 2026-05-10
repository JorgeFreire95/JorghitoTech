from rest_framework import serializers
from .models import Project, ProjectComment

class ProjectCommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = ProjectComment
        fields = ['id', 'user_name', 'content', 'created_at']
        read_only_fields = ['created_at']

class ProjectSerializer(serializers.ModelSerializer):
    comments = ProjectCommentSerializer(many=True, read_only=True)
    technologies_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'technologies', 'technologies_list',
                  'github_url', 'live_url', 'featured', 'views_count', 'comments', 'created_at']
        read_only_fields = ['created_at', 'views_count']

    def get_technologies_list(self, obj):
        return obj.get_technologies_list()
