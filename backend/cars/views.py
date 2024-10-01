from django.shortcuts import render
from rest_framework import viewsets
from .models import Car
from .serializers import CarSerializer
from rest_framework.pagination import PageNumberPagination

class StandardResults(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 100

class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    pagination_class = StandardResults