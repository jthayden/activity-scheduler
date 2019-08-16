from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('golfcourses', views.GolfCourseView)
router.register('teetimes', views.TeeTimeBookingView)
router.register('golflessons', views.GolfLessonBookingView)
router.register('tenniscomplexes', views.TennisComplexView)
router.register('courtbookings', views.CourtBookingView)
router.register('tennislessons', views.TennisLessonBookingView)

urlpatterns = [
    path('', include(router.urls))
]