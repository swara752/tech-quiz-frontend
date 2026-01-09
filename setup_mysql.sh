#!/bin/bash

# MySQL Database Setup Script for TechQuiz Application
# This script creates the database and sets up the necessary permissions

echo "=== TechQuiz MySQL Database Setup ==="
echo ""

# Create the database
echo "Creating database 'techquiz_db'..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS techquiz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Create a dedicated MySQL user (optional but recommended)
echo "Creating MySQL user 'techquiz_user'..."
sudo mysql -e "CREATE USER IF NOT EXISTS 'techquiz_user'@'localhost' IDENTIFIED BY 'techquiz_password';"

# Grant permissions
echo "Granting permissions..."
sudo mysql -e "GRANT ALL PRIVILEGES ON techquiz_db.* TO 'techquiz_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Database Name: techquiz_db"
echo "User: techquiz_user"
echo "Password: techquiz_password"
echo ""
echo "⚠️  IMPORTANT: Update TechQuiz_TIC/backend/settings.py with these credentials:"
echo ""
echo "DATABASES = {"
echo "    'default': {"
echo "        'ENGINE': 'django.db.backends.mysql',"
echo "        'NAME': 'techquiz_db',"
echo "        'USER': 'techquiz_user',"
echo "        'PASSWORD': 'techquiz_password',"
echo "        'HOST': 'localhost',"
echo "        'PORT': '3306',"
echo "    }"
echo "}"
echo ""
echo "Next steps:"
echo "1. Update the database credentials in settings.py"
echo "2. Install MySQL client: pip install mysqlclient"
echo "3. Run migrations: cd TechQuiz_TIC && python manage.py migrate"
