from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ContractedServiceViewSet

router = DefaultRouter()
router.register(r'contracted', ContractedServiceViewSet, basename='contracted-service')
router.register(r'', ServiceViewSet, basename='service')

urlpatterns = [
    path('', include(router.urls)),
]
