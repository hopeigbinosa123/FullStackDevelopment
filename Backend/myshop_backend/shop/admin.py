from django.contrib import admin
from .models import Product, Profile, Order, OrderItem, Review, Wishlist

# Register your models here.
admin.site.register(Product)
admin.site.register(Profile)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(Wishlist)