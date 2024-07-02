from rest_framework.serializers import ModelSerializer, EmailField, CharField
from store.models import Product, Category, Order, OrderItem, Customer,  ShippingAddress

class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'email','first_name', 'last_name', 'phone']

class CustomerCreateSerializer(ModelSerializer):
    # Define the fields for user registration
    email = EmailField(required=True)
    password = CharField(required=True, write_only=True)
    first_name = CharField(required=False, allow_blank=True)
    last_name = CharField(required=False, allow_blank=True)
    phone = CharField(required=False, allow_blank=True)

    class Meta:
        model = Customer
        fields = ['email', 'password', 'first_name', 'last_name', 'phone', ]

    def create(self, validated_data):
        # Create a new user with the provided data
        user = Customer.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
        )
        return user

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "get_absolute_url",
            "description",
            "price",
            "current_price",
            'size_convention',
            "imageURL",
        )

class CategorySerializer(ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "get_absolute_url",
            "products",
        )



class ShippingAddressSerializer(ModelSerializer):    
    class Meta:
        model = ShippingAddress
        fields = (
            "city",
            "state",
            "address",
            "zipcode",
        )

class OrderItemSerializer(ModelSerializer):    
    class Meta:
        model = OrderItem
        fields = (
            "product",
            "quantity",
        )

class OrderSerializer(ModelSerializer):
    items = OrderItemSerializer(many=True)
    shipping_address = ShippingAddressSerializer()

    class Meta:
        model = Order
        fields = (
            "shipping_address",
            "items",
        )
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        shipping_data = validated_data.pop('shipping_address')
        customer = validated_data['customer']
        # customer= self.context['request'].user

        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        ShippingAddress.objects.create(order=order, customer=customer, **shipping_data)
            
        return order

class MyOrderItemSerializer(ModelSerializer):    
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = (
            "product",
            "quantity",
        )

class OrderListSerializer(ModelSerializer):
    items = MyOrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "number",
            "items",
            "paid_amount"
        )