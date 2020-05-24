from rest_framework import serializers
from .models import Issue


class IssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issue
        fields = ('pk','title', 'descr', 'submitted_by',)
