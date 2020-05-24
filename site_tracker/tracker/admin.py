from django.contrib import admin
from .models import Issue, Attachment, Comment, Tracker, Status, Priority, Project  #, TaskType


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('title',
                    'descr',
                    'tracker',
                    'priority',
                    'submitted_by',
                    'assigned_to',
                    'get_all_statuses',
                    'get_all_informed',
                    'get_all_all_assoc')
    list_filter = ('title', 'tracker', 'priority', )


# @admin.register(TaskType)
# class IssueAdmin(admin.ModelAdmin):
#     list_display = ('taskname', )
#     list_filter = ('taskname', )


@admin.register(Attachment)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('file', )
    list_filter = ('file', )


@admin.register(Comment)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('issue', 'text', 'submitted_by')
    list_filter = ('text', )


@admin.register(Tracker)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('title', )
    list_filter = ('title', )


@admin.register(Status)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('statusname', )
    list_filter = ('statusname', )


@admin.register(Priority)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('priorityname', )
    list_filter = ('priorityname', )


@admin.register(Project)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('projectname', )
    list_filter = ('projectname', )
