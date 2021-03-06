# Generated by Django 2.2.4 on 2019-08-12 19:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GolfCourse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=700)),
                ('photo_url', models.CharField(max_length=400)),
            ],
        ),
        migrations.CreateModel(
            name='TeeTimeBooking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('time', models.CharField(max_length=255)),
                ('guests', models.CharField(max_length=300)),
                ('carts', models.CharField(max_length=25)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tee_time_bookings', to='scheduler_app.GolfCourse')),
            ],
        ),
    ]
