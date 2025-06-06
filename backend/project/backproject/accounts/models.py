from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):  
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)  
    name = models.CharField(max_length=255, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.email
