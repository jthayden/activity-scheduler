from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('golf-courses', views.GolfCourseView)
router.register('tee-times', views.TeeTimeBookingView)

urlpatterns = [
    path('', include(router.urls))
]