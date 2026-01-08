# Tech Quiz Backend

## Setup Instructions

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py migrate
```

3. Populate questions:
```bash
python manage.py populate_questions
```

4. Create superuser (for admin access):
```bash
python manage.py createsuperuser
```

5. Run development server:
```bash
python manage.py runserver
```

## API Endpoints

- `GET /api/questions/` - Get all questions
- `GET /api/questions/by_round/?round=1` - Get questions by round
- `POST /api/quiz/submit_round/` - Submit round answers
- `GET /api/quiz/leaderboard/` - Get leaderboard
- `POST /api/teams/` - Create team
- `GET /api/teams/` - List teams

## Admin Panel

Access at: `http://localhost:8000/admin/`

## Frontend Integration

The frontend files (round1.html, round2.html, round3.html) can fetch questions from the API and submit answers for automatic scoring and qualification.
