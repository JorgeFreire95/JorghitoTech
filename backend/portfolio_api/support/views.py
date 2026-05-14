from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Message, SupportTicket
from .serializers import MessageSerializer, SupportTicketSerializer
from django.db.models import Count, Q
from django.contrib.auth.models import User
from rest_framework.decorators import action

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        if self.request.user.is_staff:
            return Message.objects.all().order_by('created_at')
        return Message.objects.filter(Q(sender=self.request.user) | Q(recipient=self.request.user)).order_by('created_at')

    @action(detail=False, methods=['get'])
    def admin_status(self, request):
        admin_exists = User.objects.filter(is_superuser=True).exists()
        return Response({"is_online": admin_exists})

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAdminUser])
    def unread_counts(self, request):
        # Cuenta mensajes no leídos (de usuarios a admin) agrupados por remitente
        unread = Message.objects.filter(is_admin_reply=False, is_read=False)\
            .values('sender')\
            .annotate(count=Count('id'))
        return Response(unread)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAdminUser])
    def user_messages(self, request, pk=None):
        # pk es el ID del usuario
        messages = Message.objects.filter(Q(sender_id=pk) | Q(recipient_id=pk)).order_by('created_at')
        # Marcar como leídos los mensajes que van hacia el admin
        messages.filter(is_admin_reply=False, is_read=False).update(is_read=True)
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        recipient_id = self.request.data.get('recipient')
        is_admin_reply = self.request.data.get('is_admin_reply', False)
        
        if is_admin_reply and self.request.user.is_staff and recipient_id:
            serializer.save(sender=self.request.user, recipient_id=recipient_id, is_admin_reply=True)
        else:
            message = serializer.save(sender=self.request.user)
            # Notificar al admin por correo en un hilo separado para no bloquear la respuesta
            import threading
            def send_async_email(user_email, user_name, message_body):
                try:
                    admin_email = settings.DEFAULT_FROM_EMAIL
                    send_mail(
                        subject=f"Nuevo mensaje de soporte: {user_name}",
                        message=f"El usuario {user_email} ha enviado un mensaje:\n\n{message_body}",
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[admin_email],
                        fail_silently=True,
                    )
                except Exception:
                    pass
            
            email_thread = threading.Thread(
                target=send_async_email, 
                args=(self.request.user.email, self.request.user.first_name, message.body)
            )
            email_thread.start()

class SupportTicketViewSet(viewsets.ModelViewSet):
    serializer_class = SupportTicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        if self.request.user.is_staff:
            return SupportTicket.objects.all().order_by('-created_at')
        return SupportTicket.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        ticket = serializer.save(user=self.request.user)
        
        # Notificar al admin por correo
        import threading
        def send_ticket_email(user_email, user_name, ticket_subject, ticket_body):
            try:
                admin_email = settings.DEFAULT_FROM_EMAIL
                send_mail(
                    subject=f"NUEVO TICKET #{ticket.id}: {ticket_subject}",
                    message=f"El usuario {user_name} ({user_email}) ha creado un nuevo ticket de soporte.\n\n"
                            f"Asunto: {ticket_subject}\n"
                            f"Prioridad: {ticket.get_priority_display()}\n\n"
                            f"Descripción:\n{ticket_body}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[admin_email],
                    fail_silently=True,
                )
            except Exception:
                pass
        
        email_thread = threading.Thread(
            target=send_ticket_email, 
            args=(self.request.user.email, self.request.user.first_name, ticket.subject, ticket.description)
        )
        email_thread.start()
