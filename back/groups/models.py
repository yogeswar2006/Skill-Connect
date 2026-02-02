from django.db import models
from SkillConnect.models import CustomUser

# Create your models here.
class Group(models.Model):
    created_by=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE ,related_name="created_groups")
    name=models.CharField(max_length=100,unique=True)
    description=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.created_by.username} created group {self.name}"

class GroupMember(models.Model):
    user=models.ForeignKey("SkillConnect.CustomUser",on_delete=models.CASCADE,related_name="group_memberships")
    group=models.ForeignKey(Group,on_delete=models.CASCADE,related_name="group_members")
    joined_at=models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together=('user','group')  # removes duplicates!
    
    def __str__(self):
        return f"{self.user.username} joined in {self.group.name}"    
    
