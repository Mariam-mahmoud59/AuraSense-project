from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=255)  # تأكدي من استخدام التشفير لاحقًا

    def __str__(self):
        return self.name
