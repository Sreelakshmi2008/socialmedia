
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




# user regiatration  view
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        print(data)

        #fetched data sending to serializer
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid():

            # if valid user is created using serializer
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# user login view using JWT token
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self,request):
        data = request.data
       
        #fetched data sending to serializer
        serializer = UserLoginSerializer(data=data)
       
        if serializer.is_valid(raise_exception=True):

            # if valid data fetched
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            # authenticate with this email and password
            user = authenticate(request, email=email, password=password)
            
            print(user)
            
            #if user, instance is returned and create token and considered as user logged in
            if user is not None:
                print("succes login")
                refresh = RefreshToken.for_user(user)
                
                refresh['email'] = user.email
                refresh['is_superuser'] = user.is_superuser
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                return Response(
                    {
                        "email": email,
                        "password":password,
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                    status=201,
                )

            # if user none, wrong email or passord
            else:
                return Response({"details" : "wrong email or password"}, status=401)
 


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


