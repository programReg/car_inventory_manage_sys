from rest_framework import generics
from django.db.models import Q
from .models import Car
from .serializers import CarSerializer
from .permissions import IsAdminOrReadOnly


class CarListCreateView(generics.ListCreateAPIView):
    serializer_class = CarSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Car.objects.all()
        search = self.request.query_params.get("search")
        make = self.request.query_params.get("make")
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")

        if search:
            queryset = queryset.filter(Q(make__icontains=search) | Q(model__icontains=search))
        if make:
            queryset = queryset.filter(make__iexact=make)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset


class CarDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsAdminOrReadOnly]