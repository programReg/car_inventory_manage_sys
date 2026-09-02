import csv
import random
from django.core.management.base import BaseCommand
from cars.models import Car

DRIVETRAINS = ["FWD", "FWD", "RWD", "AWD", "AWD"]
BODY_STYLES = ["Sedan", "Hatchback", "SUV", "Coupe", "Wagon", "Convertible"]


class Command(BaseCommand):
    help = "Import cars from a CSV file"

    def add_arguments(self, parser):
        parser.add_argument("csv_path", type=str)

    def handle(self, *args, **options):
        csv_path = options["csv_path"]
        imported, skipped = 0, 0

        with open(csv_path, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                try:
                    Car.objects.create(
                        make=row["make"],
                        model=row["model"],
                        year=int(row["year"]),
                        mileage=float(row["mileage"]),
                        horsepower=int(row["hp"]),
                        price=float(row["price"]),
                        condition=row["offerType"],
                        transmission=row["gear"],
                        drivetrain=random.choice(DRIVETRAINS),
                        body_style=random.choice(BODY_STYLES),
                        fuel=row["fuel"],
                    )
                    imported += 1
                except (KeyError, ValueError):
                    skipped += 1

        self.stdout.write(
            self.style.SUCCESS(f"Imported {imported} cars, skipped {skipped}.")
        )
