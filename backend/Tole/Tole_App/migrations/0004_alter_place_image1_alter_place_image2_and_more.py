# Generated by Django 5.1 on 2024-09-14 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tole_App', '0003_place'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='image1',
            field=models.ImageField(blank=True, null=True, upload_to='places'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image2',
            field=models.ImageField(blank=True, null=True, upload_to='places'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image3',
            field=models.ImageField(blank=True, null=True, upload_to='places'),
        ),
        migrations.AlterField(
            model_name='place',
            name='image4',
            field=models.ImageField(blank=True, null=True, upload_to='places'),
        ),
    ]
