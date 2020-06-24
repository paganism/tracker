from rest_framework import serializers
from .models import Issue, Status, Priority, Project, Tracker, Comment
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('pk', 'username', 'first_name', 'email', 'last_name', 'is_active')

    pk = serializers.IntegerField(read_only=False)


class UserSerializerWithoutUsernameField(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('pk', 'first_name', 'email', 'last_name')

    pk = serializers.IntegerField(read_only=False)

class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('pk', 'statusname')

    pk = serializers.IntegerField(read_only=False)


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('pk', 'projectname', 'descr')

    pk = serializers.IntegerField(read_only=False)


class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = ('pk', 'priorityname')

    pk = serializers.IntegerField(read_only=False)


class TrackertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tracker
        fields = ('pk', 'title')

    pk = serializers.IntegerField(read_only=False)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk', 'text', 'submitted_by', 'created')

    pk = serializers.IntegerField(read_only=False)
    submitted_by = UserSerializer(many=False, read_only=True)


class CommentStandAloneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('issue', 'text', 'submitted_by')

    def create(self, validated_data):
        validated_data['submitted_by'] = self.context['request'].user
        return super().create(validated_data)


class IssueAssocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ['pk', 'title', 'status']

    pk = serializers.IntegerField(read_only=False)
    status = StatusSerializer(many=False, read_only=True, required=False)
    title = serializers.CharField(read_only=True)


class IssueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issue
        fields = (
            'pk', 'title', 'descr', 'status', 'assigned_to', 'status', 'project',
            'priority', 'tracker', 'inform', 'submitted_by',
            'spent_time',  'association', 'comments', 'due_date', 'created'
        )


    assigned_to = UserSerializerWithoutUsernameField(many=False, read_only=False)
    status = StatusSerializer(many=False, read_only=False)
    project = ProjectSerializer(many=False, read_only=False)
    priority = PrioritySerializer(many=False, read_only=False)
    tracker = TrackertSerializer(many=False, read_only=False)
    inform = UserSerializerWithoutUsernameField(many=True, read_only=False)
    submitted_by = UserSerializer(many=False, read_only=True)
    association = IssueAssocSerializer(many=True, read_only=False)
    comments = CommentSerializer(many=True, read_only=False)

    def _get_related_instance_object(self, data, Model):
        return Model.objects.get(pk=data.get('pk'))

    def update(self, instance, validated_data):
        if self.context['request'].method == 'PUT':
            self.fields['assigned_to'] = UserSerializerWithoutUsernameField(many=False, read_only=False)

        comments_data = validated_data.pop('comments', [])
        tracker_data = validated_data.pop('tracker')
        project_data = validated_data.pop('project')
        status_data = validated_data.pop('status')
        priority_data = validated_data.pop('priority')
        assigned_data = validated_data.pop('assigned_to')
        inform_data = validated_data.pop('inform', [])
        assoc_data = validated_data.pop('association', [])


        instance = super().update(instance, validated_data)

        for comment_data in comments_data:
            comment = Comment.objects.get(pk=comment_data.get('pk'))
            comment.text = comment_data.get('text')
            comment.save()

        project = self._get_related_instance_object(project_data, Project)
        instance.project = project
        tracker = self._get_related_instance_object(tracker_data, Tracker)
        instance.tracker = tracker
        status = self._get_related_instance_object(status_data, Status)
        instance.status = status
        priority = self._get_related_instance_object(priority_data, Priority)
        instance.priority = priority
        assigned = self._get_related_instance_object(assigned_data, CustomUser)
        instance.assigned_to = assigned

        informed_users = []
        for inform_user in inform_data:
            inform = CustomUser.objects.get(pk=inform_user.get('pk'))
            inform.save()
            informed_users.append(inform)
        instance.inform.set(informed_users)

        assoc_issues = []
        for assoc in assoc_data:
            issue = Issue.objects.get(pk=assoc.get('pk'))
            issue.save()
            assoc_issues.append(issue)
        instance.association.set(assoc_issues)

        instance.save()
        return instance

    def create(self, validated_data):

        validated_data['submitted_by'] = self.context['request'].user
        comments_data = validated_data.pop('comments', [])
        tracker_data = validated_data.pop('tracker')
        project_data = validated_data.pop('project')
        status_data = validated_data.pop('status')
        priority_data = validated_data.pop('priority')
        assigned_data = validated_data.pop('assigned_to')
        inform_data = validated_data.pop('inform', [])
        assoc_data = validated_data.pop('association', [])

        project = self._get_related_instance_object(project_data, Project)
        tracker = self._get_related_instance_object(tracker_data, Tracker)
        status = self._get_related_instance_object(status_data, Status)
        priority = self._get_related_instance_object(priority_data, Priority)
        assigned = self._get_related_instance_object(assigned_data, CustomUser)

        informed_users = []
        for inform_user in inform_data:
            inform = CustomUser.objects.get(pk=inform_user.get('pk'))
            inform.save()
            informed_users.append(inform)

        assoc_issues = []
        for assoc in assoc_data:
            issue = Issue.objects.get(pk=assoc.get('pk'))
            issue.save()
            assoc_issues.append(issue)

        issue = Issue.objects.create(
            tracker=tracker,
            project=project,
            status=status,
            priority=priority,
            assigned_to=assigned,
            **validated_data
        )
        issue.inform.set(informed_users)
        issue.association.set(assoc_issues)

        return issue
