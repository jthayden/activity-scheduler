from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GolfCourseSerializer, TeeTimeBookingSerializer
from .models import GolfCourse, TeeTimeBooking

# Create your views here.
class GolfCourseView(viewsets.ModelViewSet):
    queryset = GolfCourse.objects.all()
    serializer_class = GolfCourseSerializer

class TeeTimeBookingView(viewsets.ModelViewSet):
    queryset = TeeTimeBooking.objects.all()
    serializer_class = TeeTimeBookingSerializer
