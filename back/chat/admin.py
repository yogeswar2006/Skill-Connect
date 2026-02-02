from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(Messages)
admin.site.register(Room)
admin.site.register(RoomCall)
admin.site.register(RoomMember)
admin.site.register(Calls)
admin.site.register(RoomMessage)