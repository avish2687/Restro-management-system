from rest_framework import routers
from .views import (
    ChefViewSet, TestimonialViewSet, MenuItemViewSet,
    BookingViewSet, ContactMessageViewSet
)

router = routers.DefaultRouter()
router.register(r'chefs', ChefViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'menu', MenuItemViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'contact', ContactMessageViewSet)

urlpatterns = router.urls
