# Generated by Django 4.1.6 on 2023-02-28 12:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0004_alter_identity_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employment',
            name='file',
        ),
        migrations.RemoveField(
            model_name='identity',
            name='file',
        ),
        migrations.RemoveField(
            model_name='income',
            name='file',
        ),
        migrations.RemoveField(
            model_name='residential',
            name='file',
        ),
    ]