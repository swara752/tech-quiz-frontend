# 🔧 Network Error Fix Guide

## Problem
The frontend login pages are showing network errors because they cannot connect to the Django backend server at `http://localhost:8000`.

## ✅ Solution Applied

### 1. **Improved Error Messages**
Updated both `login.html` and `login-mobile.html` with better error handling:
- Now shows specific message: "Cannot connect to server. Please ensure the backend is running on port 8000."
- Helps users understand the issue immediately
- Logs errors to console for debugging

### 2. **Backend Server Startup**

#### Quick Start (Recommended)
```bash
# From the project root directory
./start_backend.sh
```

#### Manual Start
```bash
# Navigate to Django project
cd TechQuiz_TIC

# Activate virtual environment (if you have one)
source ../.venv/bin/activate

# Run migrations (first time only)
python manage.py migrate

# Start the server
python manage.py runserver
```

## 📋 Verification Steps

1. **Start the backend server** using one of the methods above
2. **Verify server is running** - You should see:
   ```
   Starting development server at http://127.0.0.1:8000/
   Quit the server with CONTROL-C.
   ```
3. **Open the login page** in your browser:
   - Desktop: `frontend/login.html`
   - Mobile: `frontend/login-mobile.html`
4. **Test the login flow**:
   - Enter an email address
   - Click "Verify"
   - You should now get a proper response instead of a network error

## 🆘 Troubleshooting

### Port 8000 Already in Use
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9
```

### Database Connection Issues
Make sure MySQL is running and configured:
```bash
# Check MySQL status
sudo systemctl status mysql

# Start MySQL if needed
sudo systemctl start mysql
```

### Missing Dependencies
```bash
# Install Python dependencies
pip install -r requirements.txt
```

### Database Not Set Up
```bash
cd TechQuiz_TIC
python manage.py migrate
```

## 📝 What Changed

### Files Modified:
1. **`frontend/login-mobile.html`**
   - Enhanced error handling in email form submission (lines 523-551)
   - Enhanced error handling in OTP verification (lines 602-647)

2. **`frontend/login.html`**
   - Enhanced error handling in email form submission (lines 420-448)
   - Enhanced error handling in OTP verification (lines 467-507)

### Files Created:
1. **`start_backend.sh`** - Convenient script to start the backend server

## 🎯 Next Steps

1. ✅ Error messages improved (DONE)
2. ⏳ Start the backend server
3. ⏳ Test the login flow
4. ⏳ Verify OTP functionality works

---

**Note:** The frontend requires the backend API to be running for full functionality. Without the backend, you'll see the improved error message telling you to start the server.
