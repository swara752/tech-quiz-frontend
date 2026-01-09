# Django MySQL Setup - Complete Installation Guide

## ✅ Database Created Successfully!

The MySQL database `techquiz_db` has been created successfully.

---

## 📦 Install Required System Dependencies

Before installing Python packages, you need to install MySQL development libraries:

```bash
sudo apt-get update
sudo apt-get install -y python3-dev default-libmysqlclient-dev build-essential pkg-config
```

---

## 🐍 Install Python Dependencies

After installing system dependencies, install the Python packages:

```bash
pip install -r requirements.txt
```

---

## 🗄️ Run Django Migrations

Once all dependencies are installed, run the migrations to create database tables:

```bash
cd TechQuiz_TIC
python manage.py migrate
```

---

## 👤 Create Superuser (Optional)

Create an admin user to access the Django admin panel:

```bash
python manage.py createsuperuser
```

---

## 📝 Populate Questions (Optional)

If you have a populate_questions command:

```bash
python manage.py populate_questions
```

---

## 🚀 Start the Development Server

```bash
python manage.py runserver
```

The server will be available at: `http://localhost:8000`

---

## ✅ Verification Checklist

- [ ] System dependencies installed
- [ ] Python packages installed (mysqlclient, Django, etc.)
- [ ] Database migrations completed
- [ ] Superuser created
- [ ] Development server running

---

## 🔧 Troubleshooting

### If mysqlclient installation fails:

Try installing with conda (if using Anaconda):
```bash
conda install -c conda-forge mysqlclient
```

### If migrations fail:

Check database connection:
```bash
cd TechQuiz_TIC
python manage.py dbshell
```

### If server won't start:

Check for port conflicts:
```bash
lsof -i :8000
```

---

## 📋 Current Configuration

**Database:** `techquiz_db`  
**User:** `root`  
**Password:** (empty - using sudo mysql access)  
**Host:** `localhost`  
**Port:** `3306`

All settings are configured in: `TechQuiz_TIC/backend/settings.py`
