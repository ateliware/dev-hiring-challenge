# Generated by Django 4.0.5 on 2022-06-14 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Repositorie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=100)),
                ('html_url', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=255)),
                ('created_at', models.CharField(max_length=100)),
            ],
        ),
    ]
