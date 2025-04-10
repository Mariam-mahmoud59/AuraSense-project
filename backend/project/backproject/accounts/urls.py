from django.urls import path
from .views import register_user, login_user, activate_user
from .views import send_reset_password_email, reset_password , reset_password_confirm

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", login_user, name="login"),
    path("activate/<uidb64>/<token>/", activate_user, name="activate"),
    path('reset-password/', send_reset_password_email, name="send-reset-password"),
    path('reset-password/<uidb64>/<token>/', reset_password, name="reset-password"),
    path("reset-password/<uidb64>/<token>/", reset_password_confirm, name="reset-password-confirm"),
    
    
]
