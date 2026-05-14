from rest_framework import serializers
from .models import Message, SupportTicket

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source='sender.first_name')
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'sender_name', 'body', 'is_admin_reply', 'created_at', 'is_read']
        read_only_fields = ['sender', 'is_admin_reply', 'created_at', 'is_read']

class SupportTicketSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.first_name')
    user_email = serializers.ReadOnlyField(source='user.email')
    
    class Meta:
        model = SupportTicket
        fields = ['id', 'user', 'user_name', 'user_email', 'subject', 'description', 
                  'admin_reply', 'status', 'priority', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']
