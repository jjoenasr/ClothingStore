from django.contrib import admin
from .models import Category, Product, Customer, Order, OrderItem, ShippingAddress, Size, Inventory, SizeConvention
from django.contrib.auth.admin import UserAdmin

class CustomerConfig(UserAdmin):
	model = Customer
	ordering = ('date_joined',)
	list_display = ("email", "is_staff", "is_active",)
	list_filter = ("email", "is_staff", "is_active",)
	search_fields = ('email','password',)
	fieldsets = (
        (None,{'fields':('email','password',)}),
        ('Permissions',{'fields':("is_staff", "is_active", "groups", "user_permissions")}),
        ('Personal',{'fields':('first_name','last_name', 'phone')})
	)
	add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "is_staff",
                "is_active", "user_permissions"
            )}
        ),
    )

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Customer, CustomerConfig)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(Size)
admin.site.register(SizeConvention)
admin.site.register(Inventory)
