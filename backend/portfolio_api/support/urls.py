from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet, SupportTicketViewSet

router = DefaultRouter()
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'tickets', SupportTicketViewSet, basename='ticket')

urlpatterns = [
    path('', include(router.urls)),
]
