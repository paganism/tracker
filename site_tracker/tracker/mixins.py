# from django.db import models
#
# from django.core.files.storage import FileSystemStorage
# from django.conf import settings
#
# fs = FileSystemStorage(location=settings.MEDIA_ROOT)
#
#
# class AttachField(models.Model):
#
#     attach = models.ForeignKey('Attachment', on_delete=models.CASCADE, null=True, blank=True)
#
#     class Meta:
#         abstract = True