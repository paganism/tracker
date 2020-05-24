# Generated by Django 3.0.6 on 2020-05-24 10:08

from django.conf import settings
import django.core.files.storage
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tracker', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attachment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(location='/home/yoj/otus/tracker/site_tracker/media'), upload_to='', verbose_name='Вложение')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True, max_length=1000, null=True)),
                ('attach', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tracker.Attachment')),
                ('submitted_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priorityname', models.CharField(max_length=32, verbose_name='название приоритета')),
            ],
        ),
        migrations.CreateModel(
            name='Tracker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32, verbose_name='название трекера')),
            ],
        ),
        migrations.DeleteModel(
            name='Association',
        ),
        migrations.RenameField(
            model_name='project',
            old_name='project_name',
            new_name='projectname',
        ),
        migrations.AddField(
            model_name='issue',
            name='assigned_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_to', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='issue',
            name='association',
            field=models.ManyToManyField(blank=True, to='tracker.Issue'),
        ),
        migrations.AddField(
            model_name='issue',
            name='descr',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='issue',
            name='inform',
            field=models.ManyToManyField(blank=True, related_name='informed_users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='issue',
            name='spent_time',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='issue',
            name='submitted_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='project',
            name='descr',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='tasktype',
            name='taskname',
            field=models.CharField(blank=True, max_length=32, null=True, verbose_name='название задачи'),
        ),
        migrations.AddField(
            model_name='issue',
            name='attach',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tracker.Attachment'),
        ),
        migrations.AddField(
            model_name='issue',
            name='priority',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tracker.Priority'),
        ),
        migrations.AddField(
            model_name='issue',
            name='tracker',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tracker.Tracker'),
        ),
    ]
