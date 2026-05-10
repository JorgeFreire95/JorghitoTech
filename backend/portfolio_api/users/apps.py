from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'portfolio_api.users'

    def ready(self):
        import portfolio_api.users.signals
