from django.db import models
from authentication.models import CustomUser

class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    caption = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.created_at}"




class PostMedia(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    media_file = models.FileField(upload_to='post_media/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.post.user.username}-{self.post.caption}-{self.media_file} - {self.uploaded_at}"



class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    
class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content =  models.TextField()
    commented_at = models.DateTimeField(auto_now_add=True)
