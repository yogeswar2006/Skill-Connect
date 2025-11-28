import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from SkillConnect.models import CustomUser

# u1 = CustomUser.objects.create(username="Rockey", email="rockey@example.com")
# print(u1)

from django.contrib.auth import authenticate

print(CustomUser.objects.all())

user = CustomUser(username="yogi")
user.set_password("mypassword")
user.save()

user = authenticate(username="test2", password="test2567890")
print(user)  # Should return the user object, not None



