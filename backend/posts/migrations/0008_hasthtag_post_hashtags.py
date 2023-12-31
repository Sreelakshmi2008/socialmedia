# Generated by Django 4.2.6 on 2023-11-29 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0007_rename_uuid_post_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='HasthTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hashtag', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='hashtags',
            field=models.ManyToManyField(related_name='hash', to='posts.hasthtag'),
        ),
    ]
