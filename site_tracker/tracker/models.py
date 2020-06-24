from django.db import models
from users.models import CustomUser
from site_tracker.mixins import TrackingFields
from django.core.files.storage import FileSystemStorage
from django.conf import settings


fs = FileSystemStorage(location=settings.MEDIA_ROOT)


class AttachField(models.Model):

    attach = models.ForeignKey('Attachment', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        abstract = True


class Issue(TrackingFields, AttachField):
    """ Основная сущность трекера """
    title = models.CharField(max_length=200)
    descr = models.TextField(max_length=1000, blank=True, null=True)
    status = models.ForeignKey('Status', on_delete=models.SET_NULL, related_name='statuses', null=True, blank=True)
    project = models.ForeignKey('Project', on_delete=models.CASCADE,)
    priority = models.ForeignKey('Priority', on_delete=models.CASCADE, null=True, blank=True)
    assigned_to = models.ForeignKey(CustomUser, related_name='assigned_to', on_delete=models.CASCADE, null=True, blank=True)
    inform = models.ManyToManyField(CustomUser, related_name='informed_users', blank=True)
    association = models.ManyToManyField('Issue', symmetrical=False, blank=True, related_name='issues')
    submitted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    spent_time = models.IntegerField(blank=True, default=0)
    tracker = models.ForeignKey('Tracker', on_delete=models.SET_NULL, null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return f'{self.id} {self.title} {self.status} {self.project}'

    def get_all_informed(self):
        inform_qs = CustomUser.objects.filter(informed_users=self.id)
        return [x.username for x in inform_qs]

    def get_all_all_assoc(self):
        assoc_qs = Issue.objects.filter(association=self.id)
        return [x.title for x in assoc_qs]

    # TODO Сделать mixin get_all_field для m2m связи


class Comment(TrackingFields, AttachField):
    issue = models.ForeignKey(Issue, related_name='comments', on_delete=models.CASCADE, null=True)
    text = models.TextField(max_length=1000, blank=True, null=True)
    submitted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return f'{self.id}'


class Attachment(models.Model):
    file = models.FileField(storage=fs, blank=True, null=True, verbose_name='Вложение')


class Tracker(models.Model):
    title = models.CharField('название трекера', max_length=32, null=True)

    def __str__(self):
        return self.title


class Status(models.Model):
    statusname = models.CharField('имя статуса', max_length=200, null=True)

    def __str__(self):
        return f'{self.statusname}'


class Priority(models.Model):
    priorityname = models.CharField('название приоритета', max_length=32, null=True)

    def __str__(self):
        return f'{self.priorityname}'


class Project(models.Model):
    projectname = models.CharField('название проекта', max_length=200, null=True)
    descr = models.TextField(max_length=1000, blank=True, null=True,)

    def __str__(self):
        return f'{self.projectname}'
