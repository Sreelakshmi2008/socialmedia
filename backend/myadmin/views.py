from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from authentication.api.serializers import UserRegisterSerializer,UserLoginSerializer,GetUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import permissions
from rest_framework.authentication import authenticate
# from django.contrib.auth import authenticate
from authentication.models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication


# Create your views here.


# get all registeres users 
class RegisteredUsers(APIView):
 
    def get(self,request):
        users = CustomUser.objects.filter(is_superuser=False)
        serializer = GetUserSerializer(instance=users, many=True)
        return Response(serializer.data,status=200)

# get details of user with a  email
class UserDetail(APIView):
 
    def get(self,request,userEmail):
        print(" requested for details of user")
        detail = CustomUser.objects.get(email=userEmail)
        print(detail)
        serializer = GetUserSerializer(instance=detail)
        print(serializer.data)
        return Response(serializer.data,status=200)



# delete user with id
class DeleteUser(APIView):
   
    def delete(self, request, id):
        try:
            user = CustomUser.objects.get(id=id)
            user.delete()
            return Response({"message": "success"}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            print("user not found")
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# block user with id
class BlockUser(APIView):
   
    def get(self, request, id):
        try:
            user = CustomUser.objects.get(id=id)
            b = user.is_active
            print(not b)
            user.is_active = not b
            return Response({"message": "success"}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            print("user not found")
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
