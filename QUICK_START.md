# Quick Start Guide - Run the Project

## ⚠️ Fix MySQL Authentication First

The MySQL user needs to use `mysql_native_password` instead of `caching_sha2_password`.

**Run this command:**
```bash
sudo mysql
```

**Then in MySQL prompt, run:**
```sql
ALTER USER 'django_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Django@2024!';
FLUSH PRIVILEGES;
EXIT;
```

---

## 🚀 Run Django Migrations

```bash
cd TechQuiz_TIC
python manage.py migrate
```

This will create all database tables.

---

## 👤 Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin user.

---

## 📝 Populate Questions (Optional)

If you have the populate_questions command:

```bash
python manage.py populate_questions
```

---

## ▶️ Start the Development Server

```bash
python manage.py runserver
```

The server will start at: **http://localhost:8000**

---

## 🌐 Access the Application

- **Frontend Pages:** Open `frontend/` HTML files in browser
- **Admin Panel:** http://localhost:8000/admin/
- **API Endpoints:** http://localhost:8000/api/

---

## 📂 Frontend Files

Navigate to the `frontend/` folder and open:
- `bubbler.html` - Interactive waiting room
- `login.html` - Login page
- `round1.html` - Round 1 quiz
- `round2.html` - Round 2 quiz
- `leaderboard.html` - Leaderboard
- `greet.html` - Results page

---

## ✅ Verification

1. ✅ MySQL database `techquiz_db` created
2. ✅ MySQL user `django_user` created
3. ⚠️ Fix authentication plugin (run SQL command above)
4. ⏳ Run migrations
5. ⏳ Start server

---

## 🆘 Troubleshooting

### If migrations fail:
Check database connection:
```bash
python manage.py dbshell
```

### If server won't start:
Check for port conflicts:
```bash
lsof -i :8000
```

Kill the process if needed:
```bash
kill -9 <PID>
```

---

## 📋 Project Structure

```
tech-quiz-frontend/
├── frontend/           # All HTML/CSS/JS files
├── TechQuiz_TIC/       # Django backend
│   ├── manage.py
│   ├── backend/        # Settings
│   ├── quiz/           # Quiz app
│   ├── leaderboard/    # Leaderboard app
│   └── authentication/ # Auth app
└── requirements.txt
```

---

## 🎯 Next Steps

1. Fix MySQL authentication (run SQL command above)
2. Run migrations
3. Create superuser
4. Start development server
5. Open frontend pages in browser
6. Test the application!

Good luck! 🚀
