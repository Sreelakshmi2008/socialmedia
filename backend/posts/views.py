from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post, PostMedia,Comment,Like
from .serializer import PostCreationSerializer,CommentSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser
from authentication.models import CustomUser



class CreatePost(APIView):
    
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = PostCreationSerializer(data=request.data)
    

        if serializer.is_valid():
            user = CustomUser.objects.get(id=request.data['user'])
            serializer.save(user=user)

            media = request.FILES.getlist('media')
            print(media,"mediaaa")
            for media_file in media:
               print(media_file,"these are filesss")
               PostMedia.objects.create(post=serializer.instance, media_file=media_file)
            
          
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikePost(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,id):
        try:
            p = Post.objects.get(id=id)
            if Like.objects.filter(post=p, user=request.user).exists():
                return Response({"message": "You have already liked this post"}, status=status.HTTP_400_BAD_REQUEST)

            Like.objects.create(user=request.user,post=p)
            return Response({"message": "success"}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            print("post not found")
            return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
       



# when user comments on a post
class CommentPost(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request,id):
        try:
            # Check if the post exists
            post = Post.objects.get(id=id)
            
            # Extract comment data from the request data
            comment_data = {
                'content': request.data.get('content'),
                'user': request.user.id,
                'post': post.id,
            }

            # Serialize the comment data
            serializer = CommentSerializer(data=comment_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Post.DoesNotExist:
            return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

