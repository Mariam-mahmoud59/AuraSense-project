from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser  

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('id', 'email', 'username', 'name', 'phone', 'is_staff', 'is_active')  
    list_filter = ('is_staff', 'is_active')

    fieldsets = (
        ('User Info', {'fields': ('email', 'username', 'password', 'name', 'phone')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        ('Create User', {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'name', 'phone', 'is_staff', 'is_active'),
        }),
    )
    search_fields = ('email', 'username', 'name', 'phone')  
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
