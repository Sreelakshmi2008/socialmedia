# Generated by Django 4.2.6 on 2023-11-05 07:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_customuser_is_deleted'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='is_deleted',
        ),
    ]