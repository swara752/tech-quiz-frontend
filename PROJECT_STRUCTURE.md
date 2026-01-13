# Tech Quiz Application - Final Project Structure

## 📁 Complete Directory Structure

```
tech-quiz-frontend/
├── 📂 TechQuiz_TIC/                    # Django Backend
│   ├── 📂 backend/                     # Project settings
│   │   ├── __init__.py
│   │   ├── settings.py                 # ✅ MySQL configured
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   ├── 📂 quiz/                        # Quiz app (questions, rounds)
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py                   # Question, Team, QuizAttempt, Answer, OTP
│   │   ├── views.py                    # API endpoints
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── tests.py
│   │   └── 📂 management/
│   │       └── 📂 commands/
│   │           └── populate_questions.py
│   │
│   ├── 📂 leaderboard/                 # ✅ NEW - Leaderboard app
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── views.py
│   │   └── tests.py
│   │
│   ├── 📂 authentication/              # ✅ NEW - Auth app
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── views.py
│   │   └── tests.py
│   │
│   └── manage.py                       # Django management script
│
├── 📂 frontend/                        # ✅ NEW - All frontend files
│   ├── bubbler.html                    # Interactive waiting room
│   ├── login.html                      # Login page
│   ├── round1.html                     # Round 1 quiz (20Q, 60s each)
│   ├── round2.html                     # Round 2 quiz (10Q, 30s each) - FINAL
│   ├── leaderboard.html                # Leaderboard display
│   ├── greet.html                      # Results page
│   ├── quiz.js                         # Bubbler animation logic
│   ├── round.js                        # Round quiz logic
│   ├── leaderboard.js                  # Leaderboard logic
│   ├── login.js                        # Login logic
│   └── style.css                       # Global styles
│
├── 📄 requirements.txt                 # ✅ Updated with all dependencies
├── 📄 README.md                        # ✅ Comprehensive documentation
├── 📄 DJANGO_SETUP.md                  # ✅ Django setup guide
├── 📄 MYSQL_SETUP.md                   # ✅ MySQL setup guide
├── 📄 setup_mysql.sh                   # ✅ Automated MySQL setup script
├── 📄 create_mysql_user.sh             # ✅ MySQL user creation script
├── 📄 .gitignore                       # Git ignore rules
└── 📄 db.sqlite3                       # Old SQLite database (can be removed)
```

---

## 🗄️ Database Configuration

### MySQL Database
- **Database Name:** `techquiz_db` ✅ Created
- **Recommended User:** `django_user`
- **Recommended Password:** `Django@2024!`
- **Socket Path:** `/var/run/mysqld/mysqld.sock`

### Current Settings (TechQuiz_TIC/backend/settings.py)
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'techquiz_db',
        'USER': 'root',  # Change to 'django_user' after running create_mysql_user.sh
        'PASSWORD': '',  # Change to 'Django@2024!' after creating user
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'unix_socket': '/var/run/mysqld/mysqld.sock',
        },
    }
}
```

---

## 📦 Installed Dependencies

### Python Packages (requirements.txt)
```
Django==4.2.27                  # Django framework
asgiref==3.8.1                  # ASGI support
sqlparse==0.5.3                 # SQL parsing
mysqlclient==2.2.0              # ✅ MySQL database adapter (installed via conda)
djangorestframework==3.15.2     # REST API framework
django-cors-headers==4.6.0      # CORS support
python-decouple==3.8            # Environment variables
Pillow==10.4.0                  # Image handling
pytz==2024.2                    # Timezone support
```

---

## 🌿 Git Branches

- **main** - Production-ready code (pushed to GitHub)
- **dev** - Development branch (pushed to GitHub)

---

## 🎯 Django Apps

### 1. quiz (Existing)
- Handles questions, rounds, quiz attempts
- Models: Question, Team, QuizAttempt, Answer, OTP
- API endpoints for quiz functionality

### 2. leaderboard (NEW)
- Dedicated app for leaderboard functionality
- Ready for custom leaderboard logic

### 3. authentication (NEW)
- Dedicated app for login/OTP authentication
- Ready for custom auth logic

---

## 🚀 Next Steps to Complete Setup

### 1. Create MySQL User
```bash
./create_mysql_user.sh
```

### 2. Update Django Settings
Edit `TechQuiz_TIC/backend/settings.py` and change:
```python
'USER': 'django_user',
'PASSWORD': 'Django@2024!',
```

### 3. Run Migrations
```bash
cd TechQuiz_TIC
python manage.py migrate
```

### 4. Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 5. Populate Questions (Optional)
```bash
python manage.py populate_questions
```

### 6. Start Development Server
```bash
python manage.py runserver
```

---

## 📊 Quiz Structure

### Online Rounds
- **Round 1**: 20 questions, 60 seconds per question, 50% pass threshold
- **Round 2**: 10 questions, 30 seconds per question, 60% pass threshold (FINAL ONLINE)

### Offline Round
- **Round 3**: Viva-type assessment (conducted offline)

---

## 🔗 API Endpoints

- `GET /api/questions/` - Get all questions
- `GET /api/questions/by_round/?round=1` - Get questions by round
- `POST /api/quiz/submit_round/` - Submit round answers
- `GET /api/quiz/leaderboard/` - Get leaderboard
- `POST /api/teams/` - Create team
- `GET /api/teams/` - List teams
- `POST /api/auth/send_otp/` - Send OTP
- `POST /api/auth/verify_otp/` - Verify OTP

---

## ✅ Completed Tasks

- ✅ Removed Round 3 from online quiz
- ✅ Created interactive bubbler waiting room
- ✅ Restructured project (frontend/ and TechQuiz_TIC/ folders)
- ✅ Created leaderboard and authentication Django apps
- ✅ Configured MySQL database
- ✅ Updated requirements.txt with all frameworks
- ✅ Installed mysqlclient via conda
- ✅ Created git branches (main, dev)
- ✅ Pushed all changes to GitHub
- ✅ Created comprehensive documentation

---

## 📝 Documentation Files

- **README.md** - Main project documentation
- **DJANGO_SETUP.md** - Complete Django setup guide
- **MYSQL_SETUP.md** - MySQL setup instructions
- **setup_mysql.sh** - Automated database setup
- **create_mysql_user.sh** - User creation script

---

## 🎉 Project Status

**Status:** ✅ Restructured and Ready for Development

**Remaining:** 
- Run `./create_mysql_user.sh` to create MySQL user
- Update settings.py with new credentials
- Run `python manage.py migrate` to create database tables
- Start development server

The project is now professionally structured and ready for further development!
