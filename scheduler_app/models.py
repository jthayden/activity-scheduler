from django.db import models

# Create your models here.
class GolfCourse(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=700)
    photo_url = models.CharField(max_length=400)

    def __str__(self):
        return self.name

class TeeTimeBooking(models.Model):
    name = models.CharField(max_length=255)
    time = models.CharField(max_length=255)
    guests = models.CharField(max_length=300)
    carts = models.CharField(max_length=25)
    course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE, related_name='tee_time_bookings')

    def __str__(self):
        return self.name

class LessonBooking(models.Model):
    name = models. CharField(max_length=255)
    time = models.CharField(max_length=255)
    pro = models.CharField(max_length=255)
    course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE, related_name='lesson_bookings')
    
    def __str__(self):
        return self.name   

class TennisComplex(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=700)
    photo_url = models.CharField(max_length=400)

    def __str__(self):
        return self.name

class CourtBooking(models.Model):
    name = models.CharField(max_length=255)
    time = models.CharField(max_length=255)
    court_type = models.CharField(max_length=255)
    guests = models.CharField(max_length=255)
    tennis_complex = models.ForeignKey(TennisComplex, on_delete=models.CASCADE, related_name='court_bookings') 

    def __str__(self):
        return self.name

class TennisLessonBooking(models.Model):
    name = models. CharField(max_length=255)
    time = models.CharField(max_length=255)
    pro = models.CharField(max_length=255)
    tennis_complex = models.ForeignKey(TennisComplex, on_delete=models.CASCADE, related_name='tennis_lesson_bookings')
    
    def __str__(self):
        return self.name 