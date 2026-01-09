# MySQL Database Setup Guide

## Quick Setup (Recommended)

Run the automated setup script:

```bash
./setup_mysql.sh
```

This will:
- Create the `techquiz_db` database
- Create a MySQL user `techquiz_user` with password `techquiz_password`
- Grant all necessary permissions

---

## Manual Setup (Alternative)

If you prefer to set up manually or the script doesn't work:

### 1. Access MySQL

```bash
sudo mysql
```

### 2. Create Database

```sql
CREATE DATABASE IF NOT EXISTS techquiz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Create User (Optional but Recommended)

```sql
CREATE USER IF NOT EXISTS 'techquiz_user'@'localhost' IDENTIFIED BY 'your_password_here';
GRANT ALL PRIVILEGES ON techquiz_db.* TO 'techquiz_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Update Django Settings

Edit `TechQuiz_TIC/backend/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'techquiz_db',
        'USER': 'techquiz_user',  # or 'root' if not creating a user
        'PASSWORD': 'your_password_here',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

---

## Install MySQL Client

```bash
pip install mysqlclient
```

If you encounter errors, you may need to install system dependencies:

**Ubuntu/Debian:**
```bash
sudo apt-get install python3-dev default-libmysqlclient-dev build-essential
```

**macOS:**
```bash
brew install mysql-client
```

---

## Run Migrations

```bash
cd TechQuiz_TIC
python manage.py migrate
```

---

## Verify Setup

Test the database connection:

```bash
python manage.py dbshell
```

If successful, you'll see the MySQL prompt.

---

## Troubleshooting

### Error: Access denied for user 'root'@'localhost'

Try accessing MySQL with sudo:
```bash
sudo mysql
```

### Error: Can't connect to MySQL server

Make sure MySQL is running:
```bash
sudo systemctl status mysql
# or
sudo service mysql status
```

Start MySQL if needed:
```bash
sudo systemctl start mysql
# or
sudo service mysql start
```

### Error: mysqlclient installation fails

Install system dependencies first (see "Install MySQL Client" section above).
