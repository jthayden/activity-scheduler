from django.contrib import admin
from .models import GolfCourse, TeeTimeBooking

# Register your models here.
admin.site.register([GolfCourse, TeeTimeBooking])
