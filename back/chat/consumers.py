  


import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from SkillConnect.models import CustomUser
from .models import Messages

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        
        self.user = self.scope.get("user")
      
        
        print("WEBSOCKET:",self.scope)
        
        self.user1_id = int(self.scope['url_route']['kwargs']['user1_id'])
        self.user2_id = int(self.scope['url_route']['kwargs']['user2_id'])
        
        ids = sorted([self.user1_id, self.user2_id])
        self.room_group_name = f"chat_{ids[0]}_{ids[1]}"

       
     

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "system_message", "message": f"{self.user} joined."}
        )
        
        print(f"{self.user.username} connected to {self.room_group_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        self.user = self.scope.get("user")
        if self.user and not isinstance(self.user, AnonymousUser):
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "system_message", "message": f"{self.user} left."}
            )
    
    async def receive(self, text_data=None, bytes_data=None):
     try:
        if text_data is None:
            return

        data = json.loads(text_data)
        message_type = data.get("message_type", 1)
        self.user = self.scope.get("user")

        if not self.user or not self.user.is_authenticated:
            print(" Unauthenticated user")
            return

        message_text = data.get("content", "").strip()
        receiver_id = data.get("receiver_id")

        if not message_text or not receiver_id:
            return

        # Get receiver instance
        receiver = await database_sync_to_async(CustomUser.objects.get)(id=receiver_id)

        # Save message
        message = await self.save_message(
            sender=self.user,         # CustomUser instance
            receiver_id=receiver.id,        # CustomUser instance
            content=message_text,
            message_type=message_type
        )

        # Send to group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": {
                    "id": message.id,
                    "sender": self.user.username,  #  serializable
                    "receiver_id": receiver_id,
                    "content": message_text,
                    "message_type": message_type,
                    "sent_at": message.sent_at.isoformat(),
                }
            }
        )

     except Exception as e:
        print(" Error in receive:", e)


    async def chat_message(self, event):
        await self.send(text_data=json.dumps({'type':"Chat_message",'message':event["message"]}))

    async def system_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "system",
            "message": event["message"],
        }))

    @database_sync_to_async
    def save_message(self, sender, receiver_id, content, message_type):
        receiver = CustomUser.objects.get(id=receiver_id)
        return Messages.objects.create(
            sender_id=sender,
            receiver_id=receiver,
            content=content,
            message_type=message_type
        )
