from django.urls import path,re_path,include
from . import consumers


websocket_urlpatterns = [
    # room_name captured as URL component
    re_path(r"^ws/chat/room_(?P<user1_id>\d+)_(?P<user2_id>\d+)/$", consumers.ChatConsumer.as_asgi()),
]

