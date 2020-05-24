from django.urls import path
from .views import *


urlpatterns = [
    path('issues/', issues_list),
    path('issues/<pk>', issues_detail),
]
