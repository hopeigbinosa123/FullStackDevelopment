# Generated by Django 5.1.4 on 2025-01-23 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_profile_bio_profile_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image_url',
            field=models.URLField(default='https://via.placeholder.com'),
        ),
    ]
