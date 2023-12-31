
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from authentication.api.serializers import UserRegisterSerializer,UserLoginSerializer,GetUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import permissions
from rest_framework.authentication import authenticate
# from django.contrib.auth import authenticate
from authentication.models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import api_view, permission_classes
import requests

# user regiatration  view
class RegisterView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser]

    def post(self, request):
        data = request.data
        print(data)

        #fetched data sending to serializer
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid():

            # if valid user is created using serializer
            user = serializer.save()
            print(serializer.data,"serializer data")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        print(data)
       
        # fetched data sending to serializer
        serializer = UserLoginSerializer(data=data)
        print(serializer)
        
        if serializer.is_valid(raise_exception=True):
            # If valid data fetched
            email_or_username = serializer.validated_data['email_or_username']
            password = serializer.validated_data['password']
            
            try:
                # authenticate with email or username
                user = authenticate(request, username=email_or_username, password=password)
                print(user)
                
                # if user instance is returned and create token and considered as user logged in
                if user:
                    if user.is_deleted:
                        return Response({"details": "This account has been deleted."}, status=401)

                    print("success login")
                    refresh = RefreshToken.for_user(user)
                    refresh['email'] = user.email
                    refresh['is_superuser'] = user.is_superuser
                    access_token = str(refresh.access_token)
                    refresh_token = str(refresh)

                    return Response(
                        {
                            "email_or_username": email_or_username,
                            "password": password,
                            "access": access_token,
                            "refresh": refresh_token,
                        },
                        status=201,
                    )
                else:
                    # If user is None, wrong email or password
                    return Response({"details": "Invalid email or password"}, status=401)

            except CustomUser.DoesNotExist:
                # If user doesn't exist, wrong email or password
                return Response({"details": "no user email or password"}, status=401)

# get details of logged in user
class GetUserView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]
 
    def get(self,request):
    
        user_email = request.user
        print(request.user)
        user_details = CustomUser.objects.get(email=user_email)
        serializer = GetUserSerializer(instance=user_details)
        print(serializer.data)
        return Response(serializer.data,status=200)


from google.auth.transport.requests import Request as AuthRequest
from google.oauth2 import id_token
class GoogleLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        token = request.data['google_token']
        try:
            auth_request = AuthRequest()

            # Validate the Google OAuth token
            id_info = id_token.verify_oauth2_token(token, auth_request)

            user_email = id_info['email']

            print(user_email)
            
            try:
                print("try")
                user_exist = CustomUser.objects.get(email=user_email)
                if user_exist.is_deleted:
                        return Response({"details": "This account has been deleted."}, status=401)

                print("success login")
                refresh = RefreshToken.for_user(user_exist)
                refresh['email'] = user_exist.email
                refresh['is_superuser'] = user_exist.is_superuser
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                return Response(
                    {
                        "email_or_username": user_email,
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                    status=201,
                )
            except CustomUser.DoesNotExist:
                print("except")
                return Response({"details": "User does not exist."}, status=status.HTTP_401_UNAUTHORIZED)

        except ValueError as e:
            return Response({'error': f'Invalid token: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
         
      

class ChangeProfilePicView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    parser_classes = [MultiPartParser]
    def patch(self,request):
        print(request.data)
        u = request.user
        print(request.data.get('profile_pic'))
        u.profile_pic = request.data.get('profile_pic')
        u.save()
        print(u.profile_pic)
        return Response({'message':"success",'updatedProfilePic':u.profile_pic.url},status=200)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CheckAuth(request):
    # If the view reaches here, the user is authenticated
    return Response({'message': 'Authenticated'})



class EditProfileView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    
    def patch(self,request):
        print(request.data)
        u = request.user
        u.username = request.data.get('username')
        u.name = request.data.get('name')
        u.email = request.data.get('email')
        u.phone = request.data.get('phone')
        u.save()
        return Response({'message':"success"},status=200)
    
