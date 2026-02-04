  


# # import json
# # from channels.generic.websocket import AsyncWebsocketConsumer
# # from channels.db import database_sync_to_async
# # from django.contrib.auth.models import AnonymousUser
# # from SkillConnect.models import CustomUser
# # from .models import Messages

# # class ChatConsumer(AsyncWebsocketConsumer):
# #     async def connect(self):
        
# #         self.user = self.scope.get("user")
      
        
# #         print("WEBSOCKET:",self.scope)
        
# #         self.user1_id = int(self.scope['url_route']['kwargs']['user1_id'])
# #         self.user2_id = int(self.scope['url_route']['kwargs']['user2_id'])
        
# #         ids = sorted([self.user1_id, self.user2_id])
# #         self.room_group_name = f"chat_{ids[0]}_{ids[1]}"

       
     

# #         await self.channel_layer.group_add(self.room_group_name, self.channel_name)
# #         await self.accept()

# #         await self.channel_layer.group_send(
# #             self.room_group_name,
# #             {"type": "system_message", "message": f"{self.user} joined."}
# #         )
        
# #         print(f"{self.user.username} connected to {self.room_group_name}")

# #     async def disconnect(self, close_code):
# #         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
# #         self.user = self.scope.get("user")
# #         if self.user and not isinstance(self.user, AnonymousUser):
# #             await self.channel_layer.group_send(
# #                 self.room_group_name,
# #                 {"type": "system_message", "message": f"{self.user} left."}
# #             )
    
# #     async def receive(self, text_data=None, bytes_data=None):
# #      try:
# #         if text_data is None:
# #             return

# #         data = json.loads(text_data)
# #         message_type = data.get("message_type", 1)
# #         self.user = self.scope.get("user")

# #         if not self.user or not self.user.is_authenticated:
# #             print(" Unauthenticated user")
# #             return

# #         message_text = data.get("content", "").strip()
# #         receiver_id = data.get("receiver_id")

# #         if not message_text or not receiver_id:
# #             return

# #         # Get receiver instance
# #         receiver = await database_sync_to_async(CustomUser.objects.get)(id=receiver_id)

# #         # Save message
# #         message = await self.save_message(
# #             sender=self.user,         # CustomUser instance
# #             receiver_id=receiver.id,        # CustomUser instance
# #             content=message_text,
# #             message_type=message_type
# #         )

# #         # Send to group
# #         await self.channel_layer.group_send(
# #             self.room_group_name,
# #             {
# #                 "type": "chat_message",
# #                 "message": {
# #                     "id": message.id,
# #                     "sender": self.user.username,  #  serializable
# #                     "receiver_id": receiver_id,
# #                     "content": message_text,
# #                     "message_type": message_type,
# #                     "sent_at": message.sent_at.isoformat(),
# #                 }
# #             }
# #         )

# #      except Exception as e:
# #         print(" Error in receive:", e)


# #     async def chat_message(self, event):
# #         await self.send(text_data=json.dumps({'type':"Chat_message",'message':event["message"]}))

# #     async def system_message(self, event):
# #         await self.send(text_data=json.dumps({
# #             "type": "system",
# #             "message": event["message"],
# #         }))

# #     @database_sync_to_async
# #     def save_message(self, sender, receiver_id, content, message_type):
# #         receiver = CustomUser.objects.get(id=receiver_id)
# #         return Messages.objects.create(
# #             sender_id=sender,
# #             receiver_id=receiver,
# #             content=content,
# #             message_type=message_type
# #         )

# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.db import database_sync_to_async
# from django.contrib.auth.models import AnonymousUser
# from SkillConnect.models import CustomUser
# from .models import Messages


# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.user = self.scope.get("user")

#         # 🔒 Reject unauthenticated users
#         if not self.user or self.user.is_anonymous:
#             await self.close()
#             return

#         room_name = self.scope["url_route"]["kwargs"]["room_name"]
#         self.room_group_name = f"chat_{room_name}"

#         await self.channel_layer.group_add(self.room_group_name, self.channel_name)
#         await self.accept()

#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 "type": "system_message",
#                 "message": f"{self.user.username} joined the chat",
#             },
#         )

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

#         if self.user and not self.user.is_anonymous:
#             await self.channel_layer.group_send(
#                 self.room_group_name,
#                 {
#                     "type": "system_message",
#                     "message": f"{self.user.username} left the chat",
#                 },
#             )

#     async def receive(self, text_data=None, bytes_data=None):
#         if not text_data:
#             return

#         try:
#             data = json.loads(text_data)
#             message_text = data.get("content", "").strip()
#             receiver_id = data.get("receiver_id")
#             message_type = data.get("message_type", 1)

#             if not message_text or not receiver_id:
#                 return

#             receiver = await database_sync_to_async(CustomUser.objects.get)(id=receiver_id)

#             message = await database_sync_to_async(Messages.objects.create)(
#                 sender_id=self.user,
#                 receiver_id=receiver,
#                 content=message_text,
#                 message_type=message_type,
#             )

#             await self.channel_layer.group_send(
#                 self.room_group_name,
#                 {
#                     "type": "chat_message",
#                     "message": {
#                         "id": message.id,
#                         "sender": self.user.username,
#                         "sender_id": self.user.id,
#                         "receiver_id": receiver_id,
#                         "content": message.content,
#                         "message_type": message.message_type,
#                         "sent_at": message.sent_at.isoformat(),
#                     },
#                 },
#             )

#         except Exception as e:
#             print("WebSocket receive error:", e)

#     async def chat_message(self, event):
#         await self.send(text_data=json.dumps(event["message"]))

#     async def system_message(self, event):
#         await self.send(text_data=json.dumps({
#             "system": True,
#             "message": event["message"],
#         }))

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from SkillConnect.models import CustomUser
from .models import Messages


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("🔥 CONNECT HIT")
        
        
        user = self.scope.get("user")
          # # 🔒 Reject unauthenticated users
        if not user or user.is_anonymous:
            await self.close(code=403)
            return
        
        room_name = self.scope["url_route"]["kwargs"]["room_name"]
        try:
             _, id1, id2 = room_name.split("_")
             user1_id = int(id1)
             user2_id = int(id2)
        except Exception:
            await self.close(code=4001)
            return
        
        if user.id not in (user1_id, user2_id):
            await self.close(code=403)
            return
        
        ids = sorted([user1_id, user2_id])  
        self.room_group_name = f"chat_{ids[0]}_{ids[1]}"
        
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        
        print("WS CONNECTED:", user.username, self.room_group_name)  

        
       
        print("WS QUERY STRING:", self.scope["query_string"])
        print("WS USER:", self.scope["user"])

        await self.accept()
      

       
         

    async def disconnect(self, close_code):
     try:
        user = self.scope.get("user")

        if hasattr(self, "room_group_name"):
            await self.channel_layer.group_discard(
                self.room_group_name, self.channel_name
            )

            if user and not user.is_anonymous:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "system_message",
                        "message": f"{user.username} left the chat",
                    },
                )
     except Exception as e:
        print("WS disconnect error:", e)


    async def receive(self, text_data=None, bytes_data=None):
      if not text_data:
        return

      try:
        user = self.scope.get("user")

        # 🔒 Safety check
        if not user or user.is_anonymous:
            await self.close(code=403)
            return

        if not hasattr(self, "room_group_name"):
            await self.close(code=4001)
            return

        data = json.loads(text_data)

        content = data.get("content", "").strip()
        receiver_id = data.get("receiver_id")
        message_type = data.get("message_type", 1)

        if not content or not receiver_id:
            return

        receiver = await database_sync_to_async(CustomUser.objects.get)(
            id=receiver_id
        )

        message = await database_sync_to_async(Messages.objects.create)(
            sender_id=user,
            receiver_id=receiver,
            content=content,
            message_type=message_type,
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": {
                    "id": message.id,
                    "sender": user.username,
                    "sender_id": user.id,
                    "receiver_id": receiver_id,
                    "content": message.content,
                    "message_type": message.message_type,
                    "sent_at": message.sent_at.isoformat(),
                },
            },
        )

      except Exception as e:
        print("WebSocket receive error:", repr(e))


    async def chat_message(self, event):
        # Send message directly (frontend-friendly)
        await self.send(text_data=json.dumps(event["message"]))

    async def system_message(self, event):
        await self.send(
            text_data=json.dumps({
                "system": True,
                "message": event["message"],
            })
        )
