from rest_framework import serializers
from posts.models import *


class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = ('post','media_file','uploaded_at')
    

class PostCreationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('caption', 'created_at', 'updated_at')
    
    

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('content', 'commented_at', 'user','post')
    
    
    