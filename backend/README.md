Car Inventory Management System — Backend
A REST API for browsing and managing a car inventory, built with Django and Django REST Framework. This is a rebuild of an earlier version — the original had no authentication (anyone could edit or delete inventory) and stored secrets directly in the codebase. This version fixes both.
Stack
Django 5 + Django REST Framework
PostgreSQL
JWT authentication (djangorestframework-simplejwt)
Environment-based config (python-dotenv) — no secrets committed to the repo
What it does
Public, unauthenticated browsing: list, view, search, and filter cars
Admin-only writes: creating, editing, or deleting a car requires a valid JWT belonging to a staff user
Cars have make, model, year, mileage, horsepower, price, condition, transmission, drivetrain, and body style
Setup
bash
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework psycopg2-binary python-dotenv djangorestframework-simplejwt

# create a Postgres database matching the values below

cp .env.example .env # then fill in your own values
Your .env needs:
SECRET_KEY=some-long-random-string
DEBUG=True
DB_NAME=cars_db
DB_USER=your_postgres_user
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
Then:
bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
The API is now running at http://127.0.0.1:8000/.
Auth flow
Get a token:
bash
curl -X POST http://127.0.0.1:8000/api/token/ \
 -d '{"username":"you","password":"yourpassword"}' \
 -H "Content-Type: application/json"
Use it to make a write:
bash
curl -X POST http://127.0.0.1:8000/cars/ \
 -H "Authorization: Bearer <your_access_token>" \
 -H "Content-Type: application/json" \
 -d '{"make":"Toyota","model":"Camry","year":2020,"mileage":30000,"horsepower":200,"price":18000,"condition":"Used","transmission":"Automatic","drivetrain":"FWD","body_style":"Sedan","fuel":"Gas"}'
Reads (GET /cars/, GET /cars/<id>/) work without a token. Writes without a valid staff token get rejected.
Endpoints
Method URL Auth required
GET /cars/ No
POST /cars/ Yes (staff)
GET /cars/<id>/ No
PUT/PATCH /cars/<id>/ Yes (staff)
DELETE /cars/<id>/ Yes (staff)
POST /api/token/ —
POST /api/token/refresh/ —
Notes
The frontend lives in ../frontend and talks to this API via the VITE_API_URL environment variable — see that folder's README for setup.
There's no admin UI for creating/editing cars on the live site right now — that happens through the API directly (curl, Postman, or the browsable API at /cars/ when you're logged in). Adding an admin panel to the frontend is a reasonable next step but isn't built yet.
