from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GolfCourseSerializer, TeeTimeBookingSerializer, GolfLessonBookingSerializer, TennisComplexSerializer, CourtBookingSerializer, TennisLessonBookingSerializer
from .models import GolfCourse, TeeTimeBooking, GolfLessonBooking, TennisComplex, CourtBooking, TennisLessonBooking

# Create your views here.
class GolfCourseView(viewsets.ModelViewSet):
    queryset = GolfCourse.objects.all()
    serializer_class = GolfCourseSerializer

class TeeTimeBookingView(viewsets.ModelViewSet):
    queryset = TeeTimeBooking.objects.all()
    serializer_class = TeeTimeBookingSerializer

class GolfLessonBookingView(viewsets.ModelViewSet):
    queryset = GolfLessonBooking.objects.all()
    serializer_class = GolfLessonBookingSerializer

class TennisComplexView(viewsets.ModelViewSet):
    queryset = TennisComplex.objects.all()
    serializer_class = TennisComplexSerializer

class CourtBookingView(viewsets.ModelViewSet):
    queryset = CourtBooking.objects.all()
    serializer_class = CourtBookingSerializer

class TennisLessonBookingView(viewsets.ModelViewSet):
    queryset = TennisLessonBooking.objects.all()
    serializer_class = TennisLessonBookingSerializer