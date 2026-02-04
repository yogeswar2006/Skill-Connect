from django.urls import path,re_path,include
from . import consumers


websocket_urlpatterns = [
    # room_name captured as URL component
   re_path(
     r"ws/chat/(?P<room_name>room_\d+_\d+)/$",
    consumers.ChatConsumer.as_asgi(),
),

]

