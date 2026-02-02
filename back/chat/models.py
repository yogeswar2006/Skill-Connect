from django.db import models
from SkillConnect.models import CustomUser
from groups.models import Group
# Create your models here.


class Messages(models.Model):
    class MsgType(models.IntegerChoices):
        TEXT=1,"text"
        IMAGE=2,"image"
        VOICE=3,"voice"
        CODE=4,"code"
        
    
    content=models.TextField()
    sent_at=models.DateTimeField(auto_now_add=True)     
    message_type=models.IntegerField(choices=MsgType.choices,default=MsgType.TEXT)
    is_read=models.BooleanField(default=False)
    sender_id=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name='sent_messages')
    receiver_id=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="received_messages")
    
    class Meta:
        ordering=['sent_at']
    
    def __str__(self):
        return f"{self.sender_id.username} messaged {self.receiver_id.username}"

class Calls(models.Model):
    class CallType(models.IntegerChoices):
        VOICE=1,"voice"
        VIDEO=2,"video"
    # class Status(models.IntegerChoices): # one of the way to use enums(Choices)😊
    #     ACCEPTED=1,"accepted"
    #     DECLINED=2,"declined"
    #     PENDING=3,"pending" 
    
    call_type=models.IntegerField(choices=CallType.choices)
    started_at=models.DateTimeField(auto_now_add=True)
    ended_at=models.DateTimeField(auto_now=True)
    # status=models.IntegerField(choices=Status.choices,default=Status.PENDING)
    caller_id=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="user_calls")
    receiver_id=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.caller_id.username} started {self.call_type} "
    
class Room(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField()
    created_by=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="created_rooms")
    created_at=models.DateTimeField(auto_now_add=True)
    group=models.ForeignKey("groups.Group",on_delete=models.CASCADE,related_name="group_rooms")
    
    def __str__(self):
        return f"{self.created_by.username} created room {self.name}"

class RoomMessage(models.Model):
    
    class MsgType(models.IntegerChoices):
        TEXT=1,"text"
        IMAGE=2,"image"
        VOICE=3,"voice"
        CODE=4,"code"
    
    room=models.ForeignKey(Room,on_delete=models.CASCADE,related_name="room_messages")
    sender=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="sent_room_messages")    
    content=models.TextField()
    sent_at=models.DateTimeField(auto_now_add=True)
    message_type=models.IntegerField(choices=MsgType.choices,default=MsgType.TEXT)
    
    def __str__(self):
        return f"{self.sender.username} sent {self.message_type} message"    

class RoomMember(models.Model):
    room=models.ForeignKey(Room,on_delete=models.CASCADE)
    user=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="room_membership")
    joined_at=models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f"{self.user.username} joined {self.room.name}"


class RoomCall(models.Model):
    class CallType(models.IntegerChoices):
        VOICE=1,"voice"
        VEDIIO=2,"vedio"
    
    started_at=models.DateTimeField(auto_now_add=True)
    ended_at=models.DateTimeField(auto_now=True)
    call_type=models.IntegerField(choices=CallType.choices)
    room=models.ForeignKey(Room,on_delete=models.CASCADE,related_name="room_calls")
    created_by=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="user_room_calls")
      
      
    def __str__(self):
        return f"{self.created_by.username} started {self.call_type} RoomCall"      