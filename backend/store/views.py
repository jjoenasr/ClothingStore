from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from store.models import Product, Category, Order, Inventory
from .serializers import ProductSerializer, CategorySerializer, OrderListSerializer, OrderSerializer
from rest_framework import status, authentication, permissions
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import Http404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .filters import ProductFilter
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000


# Create your views here.
class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = ['name', 'date_added']
    ordering = ['-date_added']
    pagination_class = ProductPagination
    permission_classes = [permissions.AllowAny]


class LatestProductList(ListAPIView):
    queryset = Product.objects.all().order_by('-date_added')[:10]
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    
class ProductDetail(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    def get_object(self, category_slug, product_slug):
        try:
            return Product.objects.filter(category__slug=category_slug).get(slug=product_slug)
        except Product.DoesNotExist:
            raise Http404
    
    def get(self, request, category_slug, product_slug, format=None):
        product = self.get_object(category_slug, product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

class CategoryDetail(APIView):
    def get_object(self, category_slug):
        try:
            return Category.objects.get(slug=category_slug)
        except Category.DoesNotExist:
            raise Http404
    
    def get(self, request, category_slug, format=None):
        category = self.get_object(category_slug)
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def search(request):
    query = request.GET.get('q', '')

    if query:
        products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    else:
        return Response({"results": []})

# Get order list for specific user
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
class OrdersList(APIView):
    def get(self, request, format=None):
        orders = Order.objects.filter(customer=request.user)
        serializer = OrderListSerializer(orders, many=True)
        return Response(serializer.data)



@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])
def checkout(request):
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        try:
            for item in serializer.validated_data['items']:
                product = item['product']
                size = item['size']
                quantity = item['quantity']
                # Check if inventory exists for the product and size
                try:
                    inventory = Inventory.objects.get(product=item.get('product'), size=item.get('size'))
                except Inventory.DoesNotExist:
                    return Response({'error': f'Inventory for {product} ({size}) does not exist'}, status=status.HTTP_400_BAD_REQUEST)
                
                # Check if requested quantity is available
                if inventory.quantity < quantity:
                    return Response({'error': f'Insufficient inventory for {product} ({size})'}, status=status.HTTP_400_BAD_REQUEST)
                
                inventory.quantity -= quantity
                inventory.save()
                
            serializer.save(customer=request.user)
            return Response({'Success': 'Thank you for your purchase !!' }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'Error': 'Something went wrong'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
