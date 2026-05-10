from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'service_type']
    ordering = ['-featured', '-created_at']

    def get_queryset(self):
        return Service.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
