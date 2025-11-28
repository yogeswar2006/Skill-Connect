from django.db import models
from SkillConnect.models import CustomUser
# Create your models here.


class FriendRequest(models.Model):
    class Status(models.IntegerChoices): # one of the way to use enums(Choices)😊
        ACCEPTED=1,"accepted"
        DECLINED=2,"declined"
        PENDING=3,"pending"
        
    status=models.IntegerField(choices=Status.choices,default=Status.PENDING)
    sent_at=models.DateTimeField(auto_now_add=True)
    # responded_at=models.DateTimeField(auto_now_add=True)
    sender_id=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="friend_requests_sent")
    receiver_id=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="friend_requests_received")
    
    class Meta:
        unique_together=("sender_id","receiver_id")
    
    def __str__(self):
        return f"{self.sender_id.username} sent friend request ({self.get_status_display()})"