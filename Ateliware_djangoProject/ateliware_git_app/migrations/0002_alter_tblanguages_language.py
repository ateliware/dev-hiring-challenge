# Generated by Django 3.2.3 on 2021-06-01 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ateliware_git_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tblanguages',
            name='language',
            field=models.CharField(max_length=25),
        ),
    ]
