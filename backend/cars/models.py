from django.db import models

class Car(models.Model):
    mileage = models.FloatField()
    horsepower = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    year = models.IntegerField()
    condition = models.CharField(max_length=20, default='Unknown')
    transmission = models.CharField(max_length=15)
    fuel = models.CharField(max_length=20)
    model = models.CharField(max_length=30)
    make = models.CharField(max_length=30)


    def __str__(self):
        return f"{self.make} {self.model}"
    
