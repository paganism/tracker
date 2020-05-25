from rest_framework import serializers
from .models import Issue, Status, Priority, Project, Tracker, Comment
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('pk', 'username', 'first_name', 'last_name', 'email', 'is_active')


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('pk', 'statusname')


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('pk', 'projectname', 'descr')


class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = ('pk', 'priorityname')


class TrackertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields = ('pk', 'title')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk', 'text', 'submitted_by')


class IssueHyperLinkSerializer(serializers.HyperlinkedModelSerializer):
    issues_listing = serializers.HyperlinkedIdentityField(view_name='issue')

    class Meta:
        model = Issue
        fields = ['pk', 'issues_listing']


class IssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issue
        fields = ('pk',
                  'title',
                  'descr',
                  'status',
                  'assigned_to',
                  'status',
                  'project',
                  'priority',
                  'tracker',
                  'inform',
                  'submitted_by',
                  'spent_time',
                  'association',
                  'comments')

    assigned_to = UserSerializer(many=False, read_only=True)
    status = StatusSerializer(many=False, read_only=True)
    project = ProjectSerializer(many=False, read_only=True)
    priority = PrioritySerializer(many=False, read_only=True)
    tracker = TrackertSerializer(many=False, read_only=True)
    inform = UserSerializer(many=True, read_only=True)
    submitted_by = UserSerializer(many=False, read_only=True)
    association = IssueHyperLinkSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
