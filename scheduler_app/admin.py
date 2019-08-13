from django.contrib import admin
from .models import GolfCourse, TeeTimeBooking, GolfLessonBooking, TennisComplex, CourtBooking, TennisLessonBooking

# Register your models here.
admin.site.register([GolfCourse, TeeTimeBooking, GolfLessonBooking, TennisComplex, CourtBooking, TennisLessonBooking])
