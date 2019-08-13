from rest_framework import serializers
from .models import GolfCourse, TeeTimeBooking, GolfLessonBooking, TennisComplex, CourtBooking, TennisLessonBooking

class TeeTimeBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeeTimeBooking
        fields = ('id', 'name','time','guests','carts','course')

class GolfLessonBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GolfLessonBooking
        fields = ('id','name','time','pro','course')

class GolfCourseSerializer(serializers.ModelSerializer):
    tee_time_bookings = TeeTimeBookingSerializer(many=True, read_only=True)
    golf_lesson_bookings = GolfLessonBookingSerializer(many=True, read_only=True)
    class Meta:
        model = GolfCourse
        fields = ('id','name','description','photo_url','tee_time_bookings', 'golf_lesson_bookings')

class CourtBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourtBooking
        fields = ('id','name','time','court_type','guests','tennis_complex')

class TennisLessonBookingSerializer (serializers.ModelSerializer):
    class Meta:
        model = TennisLessonBooking
        fields = ('id','name','time','pro','tennis_complex')

class TennisComplexSerializer(serializers.ModelSerializer):
    court_bookings = CourtBookingSerializer(many=True, read_only=True)
    tennis_lesson_bookings = TennisLessonBookingSerializer(many=True, read_only=True)
    class Meta:
        model = TennisComplex
        fields = ('id','name','description','photo_url','court_booking','tennis_lesson_bookings')