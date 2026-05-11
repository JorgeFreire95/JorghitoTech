from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source='sender.first_name')
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'sender_name', 'body', 'is_admin_reply', 'created_at', 'is_read']
        read_only_fields = ['sender', 'is_admin_reply', 'created_at', 'is_read']
