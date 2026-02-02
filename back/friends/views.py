from django.shortcuts import render
from django.db.models import Q
from .serializers import FriendRequestSerializer
from . models import FriendRequest

from rest_framework import viewsets ,decorators,response,status
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class FriendRequestViewset(viewsets.ModelViewSet):
    serializer_class=FriendRequestSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
         user=self.request.user
         return FriendRequest.objects.filter(
             Q(sender_id=user)|
             Q(receiver_id=user)
         ).select_related('sender_id','receiver_id')
    
    def perform_create(self, serializer):
       serializer.save(sender_id=self.request.user)
         
    # ------Custom actions-------- 
    
    @decorators.action(detail=False,methods=["get"])  
    def sent(self,request):
        user=self.request.user
        data=user.friend_requests_sent.filter(
            status=FriendRequest.Status.PENDING
        ).select_related('receiver_id') 
        serializer=self.get_serializer(data,many=True)
        return response.Response(serializer.data) 
    
    @decorators.action(detail=False,methods=["get"])
    def received(self,request):
        user=self.request.user
        data=user.friend_requests_received.filter(
            status=FriendRequest.Status.PENDING
        ).select_related("sender_id").distinct()
        serializer=self.get_serializer(data,many=True)
        return response.Response(serializer.data)
    
    @decorators.action(detail=False,methods=["get"])
    def friends(self,request ,*args, **kwargs):
        user=self.request.user
        
        if not user.is_authenticated:
            return response.Response([])
        
        frs=FriendRequest.objects.filter(
            Q(sender_id=user,status=FriendRequest.Status.ACCEPTED)|
            Q(receiver_id=user,status=FriendRequest.Status.ACCEPTED)
        ).select_related("sender_id","receiver_id") 
        
        friend=[
         fr.receiver_id if fr.sender_id==user else fr.sender_id for fr in frs
        ]
        
     
        
        data = []
        for f in friend:
           
            if f.profile_img and hasattr(f.profile_img, "url"):
                img_url = request.build_absolute_uri(f.profile_img.url)
            else:
               
                img_url = request.build_absolute_uri("/media/uploads/images/image.png")

            data.append({
                "id": f.id,
                "username": f.username,
                "profile_img": img_url,
            })
        
        return response.Response(data)
    
    @decorators.action(detail=True,methods=['patch'])
    def accept(self,request,pk=None):
        friend_request=self.get_object()
        
        if request.user != friend_request.receiver_id:
            return response.Response(
                {"error":"You are not authorized to accept this message"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        friend_request.status=FriendRequest.Status.ACCEPTED
        friend_request.save()
        
        return response.Response(
            {"message":"Friend request Accepted"},
            status=status.HTTP_200_OK
        )  
        
    @decorators.action(detail=True,methods=["patch"])
    def decline(self,request,pk=None):
        friend_request=self.get_object()
        
        if request.user != friend_request.receiver_id:
            return response.Response(
                {"error":"You are not authorized to decline this request!"},
                status=status.HTTP_403_FORBIDDEN
            )  
        
        friend_request.status=FriendRequest.Status.DECLINED
        friend_request.save()
        
        return response.Response(
            {"message":"Friend request Declined"},
            status=status.HTTP_200_OK
        )        


