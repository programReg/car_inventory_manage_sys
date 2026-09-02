from django.core.management.base import BaseCommand
from cars.models import Car


class Command(BaseCommand):
    help = "Fix BMW model suffixes: revert bad ones, apply correctly to numeric-only models"

    def handle(self, *args, **options):
        bmws = Car.objects.filter(make="BMW")
        reverted, updated = 0, 0

        for car in bmws:
            model = car.model

            # Revert anything where stripping the last letter doesn't leave a pure number
            # (catches cases like "M2i" that got wrongly modified)
            if model and model[-1] in ("i", "d") and not model[:-1].isdigit():
                car.model = model[:-1]
                car.save()
                reverted += 1
                continue

            # Only apply suffix to models that are purely numeric right now
            if model.isdigit():
                if car.fuel == "Petrol":
                    car.model = f"{model}i"
                    car.save()
                    updated += 1
                elif car.fuel == "Diesel":
                    car.model = f"{model}d"
                    car.save()
                    updated += 1

        self.stdout.write(
            self.style.SUCCESS(f"Reverted {reverted} bad ones, updated {updated} correctly.")
        )
