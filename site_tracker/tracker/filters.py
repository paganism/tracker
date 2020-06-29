from django_filters import rest_framework as filters
from .models import Issue

class IssueFilter(filters.FilterSet):
    class Meta:
        model = Issue
        fields = {
            'status__statusname': ['exact'],
            'assigned_to__username': ['exact'],
            'tracker__title': ['exact'],
            'project__projectname': ['exact'],
            'submitted_by__username': ['exact'],
        }
