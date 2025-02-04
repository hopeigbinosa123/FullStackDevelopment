from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shop.views import ProductViewSet, OrderViewSet, ReviewViewSet, AdminProductViewSet, UserProductViewSet, CreatePayPalPayment, ExecutePayPalPayment, RegisterView, LoginView, WishlistViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'admin-products', AdminProductViewSet, basename='admin-products')
router.register(r'user-products', UserProductViewSet, basename='user-products')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('create-paypal-payment/', CreatePayPalPayment.as_view(), name='create-paypal-payment'),
    path('execute-paypal-payment/', ExecutePayPalPayment.as_view(), name='execute-paypal-payment'),
]
