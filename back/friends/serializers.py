from rest_framework import serializers
from .models import FriendRequest

class FriendRequestSerializer(serializers.ModelSerializer):
    sender_username=serializers.CharField(source="sender_id.username",read_only=True)
    receiver_username=serializers.CharField(source="receiver_id.username",read_only=True)
    sender_profile_img=serializers.ImageField(source="sender_id.profile_img",read_only=True)
    receiver_profile_img=serializers.ImageField(source="receiver_id.profile_img",read_only=True)
    class Meta:
        model=FriendRequest
        fields=["id","sender_id","receiver_id","sent_at","status","sender_username","receiver_username","sender_profile_img","receiver_profile_img"]
        read_only_fields = ["sender_id"] 