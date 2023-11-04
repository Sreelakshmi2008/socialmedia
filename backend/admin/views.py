from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from authentication.api.serializers import UserRegisterSerializer,UserLoginSerializer,GetUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser
from rest_framework import permissions
from rest_framework.authentication import authenticate
# from django.contrib.auth import authenticate
from authentication.models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication


# Create your views here.


# get all registeres users 
class RegisteredUsers():
    permission_classes=[IsAdminUser]
 
    def get(self,request):
        users = CustomUser.objects.get(is_superuser=False)
        serializer = GetUserSerializer(instance=users)
        print(serializer.data)
        return Response(serializer.data,status=200)


