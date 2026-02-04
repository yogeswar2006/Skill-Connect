#                 # this is normal config of asgi if u dont use web sockets
# # import os

# # from django.core.asgi import get_asgi_application

# # os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# # application = get_asgi_application()


#                 # this is web sockects + normal config 
# import os
# from django.core.asgi import get_asgi_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# django_asgi_app = get_asgi_application();

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from channels.security.websocket import AllowedHostsOriginValidator
# import chat.routing
# from .middleware import JWTAuthMiddleware 

# # application = ProtocolTypeRouter(
# #     {
# #         "http":django_asgi_app,
# #         "websocket": AllowedHostsOriginValidator(JWTAuthMiddleware(
           
# #             URLRouter(chat.routing.websocket_urlpatterns)
        
# #         )),
# #     }
# # )

# application = ProtocolTypeRouter({
#     "http":django_asgi_app,
#     "websocket": JWTAuthMiddleware(
#         AuthMiddlewareStack(
#             URLRouter(chat.routing.websocket_urlpatterns)
#         )
#     ),
# })

import os


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

from django.core.asgi import get_asgi_application
django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

import chat.routing
from .middleware import JWTAuthMiddleware





application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": JWTAuthMiddleware(
            URLRouter(chat.routing.websocket_urlpatterns)
        ),
})
