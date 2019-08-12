from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('golfcourses', views.GolfCourseView)
router.register('teetimes', views.TeeTimeBookingView)

urlpatterns = [
    path('', include(router.urls))
]