#!/bin/bash

# Create MySQL user for Django
# Run this script to set up a dedicated MySQL user

echo "Creating MySQL user for Django..."
echo ""

sudo mysql -e "
CREATE USER IF NOT EXISTS 'django_user'@'localhost' IDENTIFIED BY 'Django@2024!';
GRANT ALL PRIVILEGES ON techquiz_db.* TO 'django_user'@'localhost';
FLUSH PRIVILEGES;
SELECT User, Host FROM mysql.user WHERE User='django_user';
"

echo ""
echo "✅ MySQL user created successfully!"
echo ""
echo "User: django_user"
echo "Password: Django@2024!"
echo ""
echo "⚠️  Update TechQuiz_TIC/backend/settings.py with these credentials:"
echo ""
echo "DATABASES = {"
echo "    'default': {"
echo "        'ENGINE': 'django.db.backends.mysql',"
echo "        'NAME': 'techquiz_db',"
echo "        'USER': 'django_user',"
echo "        'PASSWORD': 'Django@2024!',"
echo "        'HOST': 'localhost',"
echo "        'PORT': '3306',"
echo "        'OPTIONS': {"
echo "            'init_command': \"SET sql_mode='STRICT_TRANS_TABLES'\","
echo "            'unix_socket': '/var/run/mysqld/mysqld.sock',"
echo "        },"
echo "    }"
echo "}"
