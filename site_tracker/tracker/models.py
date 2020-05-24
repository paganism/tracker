from django.db import models
from users.models import CustomUser
from django.dispatch import receiver
from django.db.models.signals import pre_save
from site_tracker.mixins import TrackingFields
# from .mixins import AttachField

from django.core.files.storage import FileSystemStorage
from django.conf import settings

fs = FileSystemStorage(location=settings.MEDIA_ROOT)

# from site_tracker.requestprovider.signals import get_request
#
#
# class Trackable(models.Model):
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#
#     created_by = models.ForeignKey(CustomUser, related_name='created_%(class)s')
#     updated_by = models.ForeignKey(CustomUser, related_name='updated_%(class)s')
#     class Meta:
#         abstract = True


# @receiver(pre_save)
# def security_attributes(sender, instance, **kwargs):
#     if not issubclass(sender, Trackable):
#         return
#     request = get_request()
#
#     instance.updated_by = request.user
#
#     if instance.id is None:
#         instance.created_by = request.user


class AttachField(models.Model):

    attach = models.ForeignKey('Attachment', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        abstract = True


class Issue(TrackingFields, AttachField):
    """ Основная сущность трекера """
    title = models.CharField('название задачи', max_length=200)
    descr = models.TextField(max_length=1000, blank=True, null=True)
    status = models.ManyToManyField('Status', related_name='statuses', blank=True)
    project = models.ForeignKey('Project', on_delete=models.CASCADE,)
    priority = models.ForeignKey('Priority', on_delete=models.CASCADE, null=True, blank=True)
    assigned_to = models.ForeignKey(CustomUser, related_name='assigned_to', on_delete=models.CASCADE, null=True, blank=True)
    inform = models.ManyToManyField(CustomUser, related_name='informed_users', blank=True)
    association = models.ManyToManyField('Issue', symmetrical=False, blank=True)
    submitted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    spent_time = models.IntegerField(blank=True, default=0)
    tracker = models.ForeignKey('Tracker', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.title} {self.status} {self.project}'

    def get_all_statuses(self):
        statuses_qs = Status.objects.filter(statuses=self.id)
        return [x.statusname for x in statuses_qs]

    def get_all_informed(self):
        inform_qs = CustomUser.objects.filter(informed_users=self.id)
        return [x.username for x in inform_qs]

    def get_all_all_assoc(self):
        assoc_qs = Issue.objects.filter(association=self.id)
        return [x.title for x in assoc_qs]

    # TODO Сделать mixin get_all_field для m2m связи


class Comment(AttachField):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, null=True)
    text = models.TextField(max_length=1000, blank=True, null=True)
    submitted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.id}'


class Attachment(models.Model):
    file = models.FileField(storage=fs, blank=True, null=True, verbose_name='Вложение')

    # def __str__(self):
    #     return self.id


class Tracker(models.Model):
    title = models.CharField('название трекера', max_length=32, null=True, blank=True)

    def __str__(self):
        return self.title


# class TaskType(models.Model):
#     taskname = models.CharField('название задачи', max_length=32, null=True, blank=True)
#
#     def __str__(self):
#         return f'{self.taskname}'


class Status(models.Model):
    statusname = models.CharField('имя статуса', max_length=200)

    def __str__(self):
        return f'{self.statusname}'


class Priority(models.Model):
    priorityname = models.CharField('название приоритета', max_length=32)

    def __str__(self):
        return f'{self.priorityname}'


class Project(models.Model):
    projectname = models.CharField('название проекта', max_length=200)
    descr = models.TextField(max_length=1000, blank=True, null=True,)

    def __str__(self):
        return f'{self.projectname}'
