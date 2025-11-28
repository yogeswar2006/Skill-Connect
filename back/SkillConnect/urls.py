from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import Userview,CookieTokenObtainPairView,CookieTokenRefreshView,LogoutView,Current_user,FetchedUsers


router=DefaultRouter()

router.register(r'users',Userview)


urlpatterns = [
  path("",include(router.urls)) ,
  path('api/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
  path('logout/',LogoutView,name='logout'),
  path('current_user/',Current_user,name='current_user'),
  path('fetchedusers/<str:query>/',FetchedUsers,name='fetchedusers')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
