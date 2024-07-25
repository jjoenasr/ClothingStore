from django.db import models
from django.contrib.auth.models import  AbstractUser
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver
from django.db.models.signals import post_save
from .managers import CustomerManager

# Create your models here.
class Customer(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    phone = models.CharField(_("phone number"), max_length=15, blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    objects = CustomerManager()

    def __str__(self):
        return self.email


class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return f"/{self.slug}/"

    class Meta:
        ordering = ('name',)

class SizeConvention(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Size(models.Model):
    name = models.CharField(max_length=5)
    convention = models.ForeignKey(SizeConvention, on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('name', 'convention')

    def __str__(self):
        return f'{self.name} ({self.convention})'

class Product(models.Model):
    name = models.CharField(max_length=200, null=False)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=False)
    image = models.ImageField(null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    slug = models.SlugField()
    size_convention = models.ForeignKey(SizeConvention, on_delete=models.CASCADE, null=True)
    available_sizes = models.ManyToManyField(Size, through='Inventory')
    discounted_price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return f"/{self.category.slug}/{self.slug}/"
    
    @property
    def imageURL(self):
        if self.image:
            return self.image.url
        return ''
	
    @property
    def current_price(self):
        if self.discounted_price:
            return self.discounted_price
        elif self.discount_percentage:
            return self.price * (100 - self.discount_percentage / 100)
        else:
            return self.price
    
    class Meta:
        ordering = ('-date_added',)

class Inventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=25)

    def __str__(self):
        return f'{self.product.name} - {self.size}'
    
    @property
    def status(self):
        if self.quantity == 0:
            return 'Out Of Stock'
        elif self.quantity < 10:
            return 'Low On Stock'
        else:
            return 'Available'
    
    @receiver(post_save, sender=Product)
    def create_inventory(sender, instance, created, **kwargs):
        if created:
            sizes = Size.objects.filter(convention=instance.size_convention)
            for size in sizes:
                Inventory.objects.create(product=instance, size=size)


class Order(models.Model):
    customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.SET_NULL)
    date_ordered = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=20, choices=(('pending', 'Pending'), ('paid', 'Paid')), default='pending')

    def __str__(self):
        return str(f"SHOP#{self.id}{self.date_ordered.strftime('%Y%m%d')}")

    @property
    def number(self):
        return str(self)
    
    @property
    def items(self):
        return self.orderitem_set.all()
    
    @property
    def paid_amount(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        return total
    
    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total
    
    class Meta:
        ordering = ('-date_ordered',)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, null=True, blank=True, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0, null=True, blank=True )
    size = models.ForeignKey(Size, on_delete=models.CASCADE)

    def __str__(self):
        return str(f"{self.product} - {self.size} - {self.quantity}")
    
    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.SET_NULL)
    order = models.ForeignKey(Order, null=True, blank=True, on_delete=models.SET_NULL)
    date_added = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=100, null=False)
    city = models.CharField(max_length=100, null=False)
    state = models.CharField(max_length=100, null=False)
    zipcode = models.CharField(max_length=100, null=False)

    def __str__(self):
        return str(f"{self.address} - {self.order}")
