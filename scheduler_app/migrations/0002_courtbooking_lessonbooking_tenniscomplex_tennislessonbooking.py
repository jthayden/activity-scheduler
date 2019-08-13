# Generated by Django 2.2.4 on 2019-08-13 13:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('scheduler_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TennisComplex',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=700)),
                ('photo_url', models.CharField(max_length=400)),
            ],
        ),
        migrations.CreateModel(
            name='TennisLessonBooking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('time', models.CharField(max_length=255)),
                ('pro', models.CharField(max_length=255)),
                ('tennis_complex', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tennis_lesson_bookings', to='scheduler_app.TennisComplex')),
            ],
        ),
        migrations.CreateModel(
            name='LessonBooking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('time', models.CharField(max_length=255)),
                ('pro', models.CharField(max_length=255)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson_bookings', to='scheduler_app.GolfCourse')),
            ],
        ),
        migrations.CreateModel(
            name='CourtBooking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('time', models.CharField(max_length=255)),
                ('court_type', models.CharField(max_length=255)),
                ('guests', models.CharField(max_length=255)),
                ('tennis_complex', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='court_bookings', to='scheduler_app.TennisComplex')),
            ],
        ),
    ]
