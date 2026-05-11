from rest_framework import viewsets, filters, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Service, ContractedService
from .serializers import ServiceSerializer, ContractedServiceSerializer

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

class ContractedServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ContractedServiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return ContractedService.objects.all().order_by('-updated_at')
        return ContractedService.objects.filter(user=self.request.user).order_by('-updated_at')

    def perform_create(self, serializer):
        # Only admins can create contracted services (or they are created via onboarding flow)
        if self.request.user.is_staff:
            serializer.save()
        else:
            serializer.save(user=self.request.user)
