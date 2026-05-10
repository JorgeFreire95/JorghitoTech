from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Project, ProjectComment
from .serializers import ProjectSerializer, ProjectCommentSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'technologies']
    ordering = ['-featured', '-created_at']

    def get_queryset(self):
        return Project.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_comment(self, request, pk=None):
        project = self.get_object()
        content = request.data.get('content')
        
        if not content:
            return Response({'detail': 'El contenido es requerido'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        comment = ProjectComment.objects.create(
            project=project,
            user=request.user,
            content=content
        )
        serializer = ProjectCommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def increment_views(self, request, pk=None):
        project = self.get_object()
        project.views_count += 1
        project.save()
        return Response({'views_count': project.views_count})
