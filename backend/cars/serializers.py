from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = '__all__'

    def get_price(self, obj):
        return "${:,.2f}".format(obj.price)
