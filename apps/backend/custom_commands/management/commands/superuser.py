from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from decouple import config

DJANGO_SUPERUSER_USERNAME = config('DJANGO_SUPERUSER_USERNAME', cast=str)
DJANGO_SUPERUSER_PASSWORD = config('DJANGO_SUPERUSER_PASSWORD', cast=str)
DJANGO_SUPERUSER_EMAIL = config('DJANGO_SUPERUSER_EMAIL', cast=str)


class Command(BaseCommand):
    help = 'Criar superuser'

    def handle(self, *args, **options):
        try:
            User = get_user_model()
            user = User(
                username=DJANGO_SUPERUSER_USERNAME,
                email=DJANGO_SUPERUSER_EMAIL,
            )
            user.set_password(DJANGO_SUPERUSER_PASSWORD)
            user.is_superuser = True
            user.is_staff = True
            user.is_admin = True
            user.save()
            self.stdout.write(self.style.SUCCESS(
                'Superuser criado com sucesso!'))
        except Exception as e:
            raise CommandError(
                'Erro ao criar superuser: {}'.format(e))
