from django.urls import path
from . import views
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register',RegisterView.as_view(),name='register'),
     path('login',LoginView.as_view(),name='login'),
     path('user',GetUserView.as_view(),name='user'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),


]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


