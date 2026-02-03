from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import RefreshToken
from channels.db import database_sync_to_async
from django.db import close_old_connections
from http.cookies import SimpleCookie


@database_sync_to_async
def get_user_from_refresh(refresh_token):
    try:
        token = RefreshToken(refresh_token)
        user_id = token["user_id"]

        from django.contrib.auth import get_user_model
        User = get_user_model()

        return User.objects.get(id=user_id)
    except Exception:
        return AnonymousUser()


class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        close_old_connections()

        headers = dict(scope.get("headers", []))
        cookie_header = headers.get(b"cookie", b"").decode()

        user = AnonymousUser()

        if cookie_header:
            cookie = SimpleCookie()
            cookie.load(cookie_header)

            refresh_cookie = cookie.get("refresh_token")

            if refresh_cookie:
                user = await get_user_from_refresh(refresh_cookie.value)

        scope["user"] = user
        return await super().__call__(scope, receive, send)
