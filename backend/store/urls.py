from django.urls import path, include
from store import views

urlpatterns = [
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('latest-products/', views.LatestProductList.as_view()),
    path('products/search', views.search),
    path('products/<slug:category_slug>/<slug:product_slug>/', views.ProductDetail.as_view()),
    path('products/<slug:category_slug>/', views.CategoryDetail.as_view()),
    path('my-orders/', views.OrdersList.as_view()),
    path('checkout/', views.checkout),
]