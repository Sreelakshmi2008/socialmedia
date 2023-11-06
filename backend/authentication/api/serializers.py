from rest_framework import serializers
from authentication.models import CustomUser
from django.contrib.auth.hashers import make_password



# user register serializer
class UserRegisterSerializer(serializers.ModelSerializer): 
    print("serializer for registering user")
    profile_pic = serializers.ImageField(required=False)  # Update the field definition

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'first_name', 'last_name', 'phone','profile_pic')

    # create user
    def create(self, data):
        print("Create method in UserRegisterSerializer is called")

        profile_pic = data.pop('profile_pic', None)
        user = CustomUser.objects.create_user(**data, profile_pic=profile_pic)
        
        print(user)
        return user



class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True) 
   
    def validate(self, data):
        email = data.get('email')
        password = make_password(data.get('password'))
    
        return data

class GetUserSerializer(serializers.ModelSerializer):
     class Meta:
        model = CustomUser
        fields = ('id','first_name','last_name','email','phone','profile_pic','is_active','is_staff','is_superuser','password')
