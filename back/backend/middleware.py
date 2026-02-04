# # # jwt_middleware.py
# # from urllib.parse import parse_qs
# # from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
# # from django.contrib.auth import get_user_model
# # from channels.db import database_sync_to_async
# # from django.db import close_old_connections
# # from channels.middleware import BaseMiddleware
# # from django.contrib.auth.models import AnonymousUser
# # from rest_framework.response import Response



# # User = get_user_model()

# # @database_sync_to_async
# # def get_user_from_token(token):
# #     try:
# #         refresh_token = RefreshToken(token)
# #         user_id = refresh_token(['user_id'])
# #         return User.objects.get(id=user_id)
# #     except Exception:
# #         return AnonymousUser

# # class JWTAuthMiddleware(BaseMiddleware):
# #     def __init__(self, inner):
# #         self.inner = inner

# #     async def __call__(self, scope, receive, send):
# #        query_string=scope.get(b'refresh_token',b'').decode()
# #        token=None
       
# #        for param in query_string.split('&'):
# #            if param.startswith('token='):
# #                token=param.split('=')[1]
# #                break
       
# #        scope['user']=await get_user_from_token(token) if token else AnonymousUser()
       
# #        return await super().__call__(scope,receive,send)


from urllib.parse import parse_qs
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from SkillConnect.models import CustomUser  # adjust this import to your user model
import jwt
from django.conf import settings

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        scope["user"] = AnonymousUser()

        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get("token")

        if token:
            try:
                access_token = AccessToken(token[0])
                user_id = access_token["user_id"]
                scope["user"] = await User.objects.aget(id=user_id)
            except Exception as e:
                print("WS JWT error:", e)

        return await super().__call__(scope, receive, send)


    @staticmethod
    async def get_user(user_id):
        from django.contrib.auth import get_user_model
        CustomUser = get_user_model()
        try:
            return await CustomUser.objects.aget(id=user_id)
        except CustomUser.DoesNotExist:
            return AnonymousUser()

