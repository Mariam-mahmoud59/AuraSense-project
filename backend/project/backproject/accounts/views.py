from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.hashers import make_password

User = get_user_model()

@api_view(['POST'])
def register_user(request):
    data = request.data

    if User.objects.filter(email=data['email']).exists():
        return Response({"message": "Email already exists"}, status=400)

    if data['password'] != data['confirm_password']:
        return Response({"message": "Passwords do not match"}, status=400)

    user = User.objects.create_user(
        username=data['email'],
        email=data['email'],
        password=data['password'],
        name=data.get('name', ""),
        phone=data.get('phone', ""),
        is_verified=False  
    )

    
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    activation_link = f"http://127.0.0.1:8000/api/activate/{uid}/{token}/"

    send_mail(
        subject="Activate Your Account",
        message=f"Click the link to activate your account: {activation_link}",
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.email],
        fail_silently=False,
    )

    return Response({"message": "User registered successfully! Please check your email to verify your account."}, status=201)

from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator

@api_view(['GET'])
def activate_user(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            user.is_verified = True
            user.save()
            return Response({"message": "Your account has been activated!"}, status=200)
        else:
            return Response({"message": "Invalid activation link."}, status=400)
    except:
        return Response({"message": "Activation failed."}, status=400)



@api_view(['POST'])
def login_user(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")

    user = authenticate(username=email, password=password)

    if user is not None:
        if not user.is_verified:  
            return Response({"message": "Please verify your email first!"}, status=400)

        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful!",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "phone": user.phone
            }
        })
    else:
        return Response({"message": "Invalid email or password"}, status=400)

from django.template.loader import render_to_string

@api_view(['POST'])
def reset_password(request, uidb64, token):
    new_password = request.data.get("new_password")

    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            user.set_password(new_password)
            user.save()
            return Response({"message": "Password reset successfully!"}, status=200)
        else:
            return Response({"message": "Invalid or expired token."}, status=400)
    except Exception as e:
        print(e)
        return Response({"message": "Something went wrong."}, status=400)



@api_view(['POST'])
def send_reset_password_email(request):
    email = request.data.get('email')

    try:
        user = User.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:5173/reset-password/{uidb64}/{token}/"


        send_mail(
            subject="Reset your password",
            message=f"Click here to reset your password: {reset_link}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False,
        )

        return Response({"message": "Password reset link sent to your email."}, status=200)

    except User.DoesNotExist:
        return Response({"message": "User with this email does not exist."}, status=404)
@api_view(['POST'])
def reset_password_confirm(request, uidb64, token):  
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            new_password = request.data.get("new_password")
            confirm_password = request.data.get("confirm_password")

            if new_password != confirm_password:
                return Response({"message": "Passwords do not match."}, status=400)

            user.password = make_password(new_password)
            user.save()

            return Response({"message": "Password reset successful!"}, status=200)
        else:
            return Response({"message": "Invalid or expired token."}, status=400)

    except Exception as e:
        return Response({"message": "Something went wrong."}, status=400)
