from django.urls import path
from .views import UsersViewSet, issues_list, issues_detail



urlpatterns = [
    path('issues/', issues_list),
    path('issues/<pk>', issues_detail, name='issue'),
    path("users/", UsersViewSet.as_view({'get': 'list', 'post': 'create'}), name='apiusers'),
    path("users/<pk>", UsersViewSet.as_view({'get': 'retrieve'}), name='apiuser'),
]
