from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Issue


@receiver(post_save, sender=Issue)
def log_something(sender, instance, **kwargs):
    for name, value in kwargs.items():
        print('{0} = {1}'.format(name, value))

    # add backward record to related table
    for issue in instance.association.all():
        issue.association.add(instance)

    # remove backward record from related table

    for issue in instance.issues.all():
        if issue not in instance.association.all():
            issue.association.remove(instance)
