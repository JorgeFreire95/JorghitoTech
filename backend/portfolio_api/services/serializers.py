from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'service_type', 'icon', 'price', 'featured', 'created_at']
        read_only_fields = ['created_at']
