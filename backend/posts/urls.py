from django.urls import path
from .views import *


urlpatterns = [
    path('createpost',CreatePost.as_view(),name='createpost'),
    path('likepost/<int:id>/', LikePost.as_view(), name='likepost'),
    path('commentpost/<int:id>/', CommentPost.as_view(), name='commentpost')


]
