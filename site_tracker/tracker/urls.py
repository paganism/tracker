from django.urls import path
from .views import UsersViewSet, CommentsViewSet, login, IssueViewSet, TrackerViewSet, \
    ProjectViewSet, StatusViewSet, PriorityViewSet, is_auth, logout


urlpatterns = [
    path('login', login),
    path('logout', logout),
    path('auth', is_auth),
    path("users/", UsersViewSet.as_view({'get': 'list', 'post': 'create'}), name='apiusers'),
    path("users/<pk>", UsersViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='apiuser'),
    path("comments/", CommentsViewSet.as_view({'get': 'list', 'post': 'create'}), name='apicomments'),
    path("comments/<pk>", CommentsViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy', 'post': 'create'}), name='apicomment'),
    path("issues/", IssueViewSet.as_view({'get': 'list', 'post': 'create'}), name='issues_list'),
    path("issues/<pk>", IssueViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path("trackers/", TrackerViewSet.as_view({'get': 'list', 'post': 'create'}), name='tracker_list'),
    path("tracker/<pk>", TrackerViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path("projects/", ProjectViewSet.as_view({'get': 'list', 'post': 'create'}), name='project_list'),
    path("project/<pk>", ProjectViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path("statuses/", StatusViewSet.as_view({'get': 'list', 'post': 'create'}), name='status_list'),
    path("statuses/<pk>", StatusViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path("priority/", PriorityViewSet.as_view({'get': 'list', 'post': 'create'}), name='priority_list'),
    path("priority/<pk>", PriorityViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),

]
