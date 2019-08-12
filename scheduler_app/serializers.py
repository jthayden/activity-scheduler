from rest_framework import serializers
from .models import GolfCourse, TeeTimeBooking

class TeeTimeBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeeTimeBooking
        fields = ('id', 'name','time','guests','carts','course')

class GolfCourseSerializer(serializers.ModelSerializer):
    tee_times = TeeTimeBookingSerializer(many=True, read_only=True)
    class Meta:
        model = GolfCourse
        fields = ('id','name','description','photo_url','tee_times')