from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = "Create or fix admin user"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        username = os.getenv("DJANGO_SUPERUSER_USERNAME")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")

        if not username or not password:
            self.stdout.write("❌ Missing env variables")
            return

        user, created = User.objects.get_or_create(
            username=username,
            defaults={"email": email}
        )

        # 🔥 FORCE correct admin flags
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.email = email
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write("✅ Superuser created")
        else:
            self.stdout.write("♻️ Superuser fixed / updated")
