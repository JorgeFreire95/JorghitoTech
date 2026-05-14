from django.db import models
from django.contrib.auth.models import User

class Service(models.Model):
    SERVICE_TYPES = [
        ('web', 'Desarrollo Web'),
        ('desktop', 'Desarrollo Desktop'),
        ('mobile', 'Desarrollo Móvil'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='services')
    title = models.CharField(max_length=200)
    description = models.TextField()
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES)
    icon = models.CharField(max_length=100, default='code')
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class ContractedService(models.Model):
    STATUS_CHOICES = [
        ('desarrollo', 'En Desarrollo'),
        ('revision', 'En Revisión'),
        ('finalizado', 'Finalizado'),
        ('mantenimiento', 'En Mantenimiento'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contracted_services')
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='desarrollo')
    progress = models.IntegerField(default=0)
    website_url = models.URLField(blank=True, null=True)
    delivery_instructions = models.TextField(blank=True, null=True)
    monthly_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    next_payment = models.DateField(null=True, blank=True)
    is_maintenance_paid = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Auto-calculate progress based on status
        if self.status == 'desarrollo':
            self.progress = 25
        elif self.status == 'revision':
            self.progress = 50
        elif self.status == 'finalizado':
            self.progress = 100
        
        # Auto-calculate next payment if not set (30 days from creation)
        if not self.next_payment:
            from datetime import timedelta
            from django.utils import timezone
            # Use current date if it's a new instance
            base_date = timezone.now().date()
            self.next_payment = base_date + timedelta(days=30)
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.user.username}"
