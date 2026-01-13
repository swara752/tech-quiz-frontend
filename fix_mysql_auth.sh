#!/bin/bash

# Fix MySQL authentication plugin for Django user
# This changes the authentication plugin to mysql_native_password

echo "Fixing MySQL authentication plugin..."
echo ""

sudo mysql -e "
ALTER USER 'django_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Django@2024!';
FLUSH PRIVILEGES;
SELECT User, Host, plugin FROM mysql.user WHERE User='django_user';
"

echo ""
echo "✅ Authentication plugin updated successfully!"
echo ""
echo "The user now uses mysql_native_password which is compatible with mysqlclient."
echo ""
echo "You can now run migrations:"
echo "cd TechQuiz_TIC && python manage.py migrate"
