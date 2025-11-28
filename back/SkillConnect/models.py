from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    email=models.EmailField(unique=True)
    bio=models.TextField(blank=True)
    profile_img=models.ImageField(upload_to="uploads/images/")
    created_at=models.DateTimeField(auto_now_add=True)
    last_login=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.username



        
