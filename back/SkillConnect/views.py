from django.shortcuts import render
from .models import *
from rest_framework import viewsets
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes ,authentication_classes
from django.http import JsonResponse 
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from friends.models import FriendRequest
from rest_framework_simplejwt.exceptions import TokenError

from django.http import JsonResponse

from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

class Userview(viewsets.ModelViewSet):
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer
   
    



# Custom Login to set refresh token in HttpOnly cookie
class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            refresh = response.data['refresh']
            response.set_cookie(
                key='refresh_token',
                value=refresh,  
                httponly=True,
                secure=True,  # True in production with HTTPS
                samesite='None',
                max_age=7*24*60*60
            )
            del response.data['refresh']  # remove refresh from JSON
        return response

# Custom Refresh endpoint using HttpOnly cookie
class CookieTokenRefreshView(TokenRefreshView):
     def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response(
                {"detail": "No refresh token cookie"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        try:
            # 🔥 IMPORTANT: make request data mutable
            data = request.data.copy()
            data["refresh"] = refresh_token

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            return Response(
                serializer.validated_data,
                status=status.HTTP_200_OK
            )

        except TokenError:
            # 👇 THIS IS WHERE IT GOES
            response = Response(
                {"detail": "Invalid or expired refresh token"},
                status=status.HTTP_401_UNAUTHORIZED
            )
            response.delete_cookie("refresh_token")
            return response



# def LogoutView(request):
#     logout(request)
#     response=JsonResponse({"message":"Logged out successfully!"})
  
#     response.delete_cookie('refresh_token')
    
#     return response

@csrf_exempt
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def LogoutView(request):
    response = JsonResponse({"message": "Logged out successfully"})

    response.set_cookie(
        key='refresh_token',
        value='',
        httponly=True,
        secure=True,
        samesite='None',
        max_age=0,   # 👈 expires immediately
        path='/'
    )
    return response



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Current_user(request):
    user=request.user
    return Response({
        'id':user.id,
        'username':user.username,
        'email':user.email,
        'profile_img':user.profile_img.url
    })
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])    
def FetchedUsers(request,query=None):
    
    current_user=request.user
    friends=FriendRequest.objects.filter(
        Q(sender_id=current_user , status=1)|
        Q(receiver_id=current_user,status=1)
    )
    
    friends_ids=set()
    
    for f in friends:
        friends_ids.add(f.sender_id.id)
        friends_ids.add(f.receiver_id.id)
    
    friends_ids.add(current_user.id)
    
    
    users=CustomUser.objects.filter(username__icontains=query).exclude(id__in=friends_ids).order_by("-created_at") 
    serializer=FetchedUserSerializer(users,many=True)
    return Response(serializer.data) 
      
              