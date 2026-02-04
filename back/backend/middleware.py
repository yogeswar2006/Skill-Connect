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


# from urllib.parse import parse_qs
# from channels.middleware import BaseMiddleware
# from django.contrib.auth.models import AnonymousUser
# from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
# from SkillConnect.models import CustomUser  # adjust this import to your user model
# import jwt
# from django.conf import settings

# class JWTAuthMiddleware(BaseMiddleware):
#     async def __call__(self, scope, receive, send):
#         scope["user"] = AnonymousUser()

#         query_string = parse_qs(scope["query_string"].decode())
#         token = query_string.get("token")

#         if token:
#             try:
#                 access_token = AccessToken(token[0])
#                 user_id = access_token["user_id"]
#                 scope["user"] = await User.objects.aget(id=user_id)
#             except Exception as e:
#                 print("WS JWT error:", e)

#         return await super().__call__(scope, receive, send)


#     @staticmethod
#     async def get_user(user_id):
#         from django.contrib.auth import get_user_model
#         CustomUser = get_user_model()
#         try:
#             return await CustomUser.objects.aget(id=user_id)
#         except CustomUser.DoesNotExist:
#             return AnonymousUser()

from urllib.parse import parse_qs
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

User = get_user_model()


class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        print("\n================ WS MIDDLEWARE HIT ================")

        # Default user
        scope["user"] = AnonymousUser()

        # 🔍 Raw headers
        print("🔹 HEADERS:")
        for h in scope.get("headers", []):
            print("   ", h)

        # 🔍 Query string
        raw_qs = scope.get("query_string", b"")
        print("🔹 RAW QUERY STRING:", raw_qs)

        if not raw_qs:
            print("❌ NO QUERY STRING RECEIVED")
            return await super().__call__(scope, receive, send)

        # 🔍 Parse query params
        query_params = parse_qs(raw_qs.decode())
        print("🔹 PARSED QUERY PARAMS:", query_params)

        token_list = query_params.get("token")

        if not token_list:
            print("❌ TOKEN NOT FOUND IN QUERY PARAMS")
            return await super().__call__(scope, receive, send)

        token = token_list[0]
        print("🔹 TOKEN (first 30 chars):", token[:30], "...")

        # 🔐 Decode JWT
        try:
            access_token = AccessToken(token)
            user_id = access_token.get("user_id")

            print("🔹 TOKEN VALID, user_id =", user_id)

            if not user_id:
                print("❌ user_id missing in token payload")
                return await super().__call__(scope, receive, send)

            # Fetch user
            user = await User.objects.aget(id=int(user_id))
            scope["user"] = user

            print("✅ USER AUTHENTICATED:", user.username)

        except Exception as e:
            print("❌ JWT AUTH ERROR:", repr(e))
            scope["user"] = AnonymousUser()

        print("🔹 FINAL scope['user'] =", scope["user"])
        print("===================================================\n")

        return await super().__call__(scope, receive, send)
