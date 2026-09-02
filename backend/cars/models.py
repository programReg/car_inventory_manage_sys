from django.db import models

class Car(models.Model):
    make = models.CharField(max_length=30)
    model = models.CharField(max_length=30)
    year = models.IntegerField()
    mileage = models.FloatField()
    horsepower = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    condition = models.CharField(max_length=20, default="Unknown")
    transmission = models.CharField(max_length=15)
    drivetrain = models.CharField(max_length=10, default="unknown")
    body_style = models.CharField(max_length=15,  default="unknown")   
    fuel = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

    class Meta:
        ordering = ['id']