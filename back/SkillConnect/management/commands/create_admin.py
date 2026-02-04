from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

User = get_user_model()

class Command(BaseCommand):
    help = "Create or update admin user from environment variables"

    def handle(self, *args, **options):
        username = os.getenv("DJANGO_SUPERUSER_USERNAME")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")

        if not username or not email or not password:
            self.stdout.write(self.style.ERROR(
                "Missing DJANGO_SUPERUSER_* environment variables"
            ))
            return

        # 🔍 Find user by email (email must be unique)
        user, created = User.objects.get_or_create(
            email=email,
            defaults={"username": username},
        )

        # ✏️ Update username if changed
        if user.username != username:
            self.stdout.write(
                f"🔁 Updating username: {user.username} → {username}"
            )
            user.username = username

        # 🔑 Always reset password
        user.set_password(password)

        # 🛡️ Ensure admin permissions
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True

        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(
                f"✅ Admin user CREATED: {email}"
            ))
        else:
            self.stdout.write(self.style.SUCCESS(
                f"♻️ Admin user UPDATED: {email}"
            ))
