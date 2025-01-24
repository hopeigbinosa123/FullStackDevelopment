from django.contrib import admin
from .models import Product, Profile

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'stock', 'created_at', 'updated_at', 'image_url')
    search_fields = ('title', 'description')
    list_filter = ('created_at', 'updated_at')

admin.site.register(Product, ProductAdmin)
admin.site.register(Profile)
