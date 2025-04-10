from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128) 

    class Meta:
        app_label = 'backproject' 

    def __str__(self):
        return self.name
