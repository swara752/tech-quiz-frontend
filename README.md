# Tech Quiz Application

This website is specially made for the TechQuiz Competition, which is conducted in TIC events.

## Project Structure

```
tech-quiz-frontend/
├── TechQuiz_TIC/              # Django Backend
│   ├── backend/               # Project settings
│   ├── quiz/                  # Quiz app (questions, rounds)
│   ├── leaderboard/           # Leaderboard app
│   ├── authentication/        # Login/OTP authentication app
│   └── manage.py
├── frontend/                  # Frontend files
│   ├── bubbler.html          # Interactive waiting room
│   ├── login.html            # Login page
│   ├── round1.html           # Round 1 quiz
│   ├── round2.html           # Round 2 quiz (final online round)
│   ├── leaderboard.html      # Leaderboard display
│   ├── greet.html            # Results page
│   ├── *.js                  # JavaScript files
│   └── style.css             # Styles
├── requirements.txt
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure MySQL Database

Create a MySQL database:
```sql
CREATE DATABASE techquiz_db;
```

Update `TechQuiz_TIC/backend/settings.py` with your MySQL credentials:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'techquiz_db',
        'USER': 'your_mysql_user',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 3. Run Migrations

```bash
cd TechQuiz_TIC
python manage.py migrate
```

### 4. Populate Questions (Optional)

```bash
python manage.py populate_questions
```

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

### 6. Run Development Server

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
- `POST /api/auth/send_otp/` - Send OTP for login
- `POST /api/auth/verify_otp/` - Verify OTP

## Quiz Structure

- **Round 1**: 20 questions, 60 seconds per question, 50% pass threshold
- **Round 2**: 10 questions, 30 seconds per question, 60% pass threshold (Final online round)
- **Round 3**: Offline viva-type assessment

## Git Branching Strategy

- `main` - Production-ready code
- `dev` - Development branch
- `feature/*` - Feature branches

## Admin Panel

Access at: `http://localhost:8000/admin/`

## Frontend Pages

- **Bubbler** (`bubbler.html`) - Interactive waiting room with bubble animations
- **Login** (`login.html`) - OTP-based authentication
- **Rounds** (`round1.html`, `round2.html`) - Quiz pages for each round
- **Leaderboard** (`leaderboard.html`) - Real-time leaderboard
- **Greet** (`greet.html`) - Results and congratulations page
