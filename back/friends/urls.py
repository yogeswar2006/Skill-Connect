from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import FriendRequestViewset

router=DefaultRouter()

router.register(f'friend-requests',FriendRequestViewset,basename='friendrequest')

urlpatterns=[
    *router.urls
]