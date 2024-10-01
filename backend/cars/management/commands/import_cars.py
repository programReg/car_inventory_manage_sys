import csv
from django.core.management.base import BaseCommand
from cars.models import Car  

class Command(BaseCommand):
    help = 'Import cars from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str)

    def handle(self, *args, **kwargs):
        csv_file_path = kwargs['csv_file']
        with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                # Check for empty fields
                if all(row[field] for field in ['mileage', 'hp', 'price', 'year', 'offerType', 'gear', 'fuel', 'model', 'make']):
                    Car.objects.create(
                        mileage=row['mileage'],
                        horsepower=row['hp'],
                        price=row['price'],
                        year=row['year'],
                        condition=row['offerType'],
                        transmission=row['gear'],
                        fuel=row['fuel'],
                        model=row['model'],
                        make=row['make']
                    )

        self.stdout.write(self.style.SUCCESS('Data import process completed.'))
