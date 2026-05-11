from rest_framework import serializers
from .models import Service, ContractedService

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'service_type', 'icon', 'price', 'featured', 'created_at']
        read_only_fields = ['created_at']

class ContractedServiceSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = ContractedService
        fields = '__all__'
