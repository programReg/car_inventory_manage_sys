# Generated by Django 5.1.1 on 2024-09-26 03:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cars', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='car',
            name='conditon',
        ),
        migrations.AddField(
            model_name='car',
            name='condition',
            field=models.CharField(default='Unknown', max_length=20),
        ),
        migrations.AlterField(
            model_name='car',
            name='horsepower',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='car',
            name='transmission',
            field=models.CharField(max_length=15),
        ),
    ]
