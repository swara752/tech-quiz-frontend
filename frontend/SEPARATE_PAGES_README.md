# Separate Login Pages - Documentation

## 📄 Overview

I've created three separate HTML files for the login flow instead of a single-page application. Each page handles one specific step of the authentication process.

## 📁 Files Created

### 1. **send-otp.html** - Email Entry Page
**Location:** [`frontend/send-otp.html`](file:///home/user17/kavya/tech-quiz-frontend/tech-quiz-frontend/frontend/send-otp.html)

**Purpose:** Collect user's email and send OTP

**Features:**
- Clean email input form
- "Send OTP" button
- Sends POST request to `/api/auth/send_otp/`
- Stores email in `sessionStorage`
- Automatically redirects to `verify-otp.html` on success
- Shows error messages if backend is down or request fails
- Disables button during request to prevent double-submission

**Flow:**
```
User enters email → Click "Send OTP" → API call → Success → Redirect to verify-otp.html
```

---

### 2. **verify-otp.html** - OTP Verification Page
**Location:** [`frontend/verify-otp.html`](file:///home/user17/kavya/tech-quiz-frontend/tech-quiz-frontend/frontend/verify-otp.html)

**Purpose:** Verify the OTP sent to user's email

**Features:**
- Displays user's email (from sessionStorage)
- 6 individual OTP input boxes
- Auto-advance to next input on digit entry
- Paste support (paste 6-digit OTP)
- "Submit OTP" button
- "Resend OTP" button
- Back link to email entry page
- Sends POST request to `/api/auth/verify_otp/`
- Stores team info in sessionStorage on success
- Redirects to `login-success.html` on successful verification
- Auto-focuses first input on page load

**Security:**
- Redirects to `send-otp.html` if no email found in sessionStorage
- Clears OTP inputs on error

**Flow:**
```
Page loads → Check sessionStorage for email → Display OTP inputs
User enters OTP → Click "Submit" → API call → Success → Redirect to login-success.html
```

---

### 3. **login-success.html** - Success Page
**Location:** [`frontend/login-success.html`](file:///home/user17/kavya/tech-quiz-frontend/tech-quiz-frontend/frontend/login-success.html)

**Purpose:** Show success message and allow user to start quiz

**Features:**
- Animated success icon (🚀)
- "Good Luck!" message
- Displays logged-in email
- "Start Quiz" button
- Redirects to `round1.html` when clicked
- Prevents back navigation (security feature)

**Security:**
- Redirects to `send-otp.html` if no email found in sessionStorage
- Prevents going back to OTP page using browser back button

**Flow:**
```
Page loads → Check authentication → Display success → Click "Start Quiz" → Go to round1.html
```

---

## 🔄 Complete Login Flow

```
┌─────────────────┐
│  send-otp.html  │  ← User enters email
└────────┬────────┘
         │ Email stored in sessionStorage
         │ Redirect on success
         ▼
┌─────────────────┐
│ verify-otp.html │  ← User enters OTP
└────────┬────────┘
         │ Team info stored in sessionStorage
         │ Redirect on success
         ▼
┌──────────────────┐
│login-success.html│  ← Success message
└────────┬─────────┘
         │ Click "Start Quiz"
         ▼
┌─────────────────┐
│   round1.html   │  ← Quiz begins
└─────────────────┘
```

## 🔐 State Management

All pages use `sessionStorage` to maintain state:

| Key | Value | Set By | Used By |
|-----|-------|--------|---------|
| `userEmail` | User's email address | send-otp.html | verify-otp.html, login-success.html |
| `teamId` | Team ID from backend | verify-otp.html | (Future use in quiz) |
| `teamName` | Team name from backend | verify-otp.html | (Future use in quiz) |

## 🎨 Design Features

All three pages share:
- **Consistent styling** with TechQuiz branding
- **Glassmorphism** design with backdrop blur
- **Animated backgrounds** (grid + glow)
- **Smooth animations** (slide up, fade in, scale)
- **Mobile-optimized** with responsive design
- **Touch-friendly** buttons and inputs
- **Haptic feedback** on supported devices
- **Safe area support** for notched devices (iPhone X+)

## 📱 Mobile Optimizations

- Viewport meta tags for proper scaling
- No zoom on input focus (iOS)
- Large touch targets (buttons, inputs)
- Numeric keyboard for OTP inputs
- Gesture prevention for better UX
- Responsive font sizes
- Optimized for small screens (375px and below)

## 🧪 Testing

### Test Results

**✅ Send OTP Page**
- Email input works correctly
- API call successful
- Redirect to verify-otp.html works
- Error handling works

![Send OTP Page](file:///home/user17/.gemini/antigravity/brain/cc3d68f0-e969-4f99-bba7-0d42be7ac25b/send_otp_page_1768367739797.png)

**✅ Verify OTP Page**
- Email display works
- OTP inputs work correctly
- Auto-advance works
- Resend OTP works
- Back link works

![Verify OTP Page](file:///home/user17/.gemini/antigravity/brain/cc3d68f0-e969-4f99-bba7-0d42be7ac25b/verify_otp_page_1768367781974.png)

**✅ Login Success Page**
- Success animation works
- Email display works
- Start Quiz button works
- Security redirect works

![Login Success Page](file:///home/user17/.gemini/antigravity/brain/cc3d68f0-e969-4f99-bba7-0d42be7ac25b/login_success_page_1768367943770.png)

### Flow Recording
![Complete Flow](file:///home/user17/.gemini/antigravity/brain/cc3d68f0-e969-4f99-bba7-0d42be7ac25b/separate_pages_test_1768367722560.webp)

## 🚀 How to Use

### For Users
1. Open `send-otp.html` in your browser
2. Enter your email address
3. Click "Send OTP"
4. Check your email for the OTP (currently logged to console)
5. Enter the 6-digit OTP
6. Click "Submit OTP"
7. Click "Start Quiz" to begin

### For Developers

**Backend must be running:**
```bash
cd TechQuiz_TIC
python manage.py runserver
```

**Access the pages:**
- Email Entry: `frontend/send-otp.html`
- OTP Verification: `frontend/verify-otp.html` (auto-redirected)
- Success: `frontend/login-success.html` (auto-redirected)

**Get OTP from terminal:**
The OTP is printed in the Django console:
```
OTP for demo@test.com: 123456
```

## 🔧 Customization

### Change API Base URL
Edit the `API_BASE_URL` constant in each file:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### Change Quiz Start Page
Edit the redirect in `login-success.html`:
```javascript
window.location.href = 'round1.html';  // Change to your quiz page
```

### Modify Styling
All styles are embedded in each HTML file's `<style>` tag. CSS variables are defined in `:root` for easy customization:
```css
:root {
    --primary: #00f5ff;
    --primary-dark: #0099ff;
    --bg-dark: #0a0e27;
    --bg-darker: #1a1a2e;
    /* ... */
}
```

## 🆚 Comparison: Single Page vs Separate Pages

| Feature | Single Page (login-mobile.html) | Separate Pages |
|---------|--------------------------------|----------------|
| **File Count** | 1 file | 3 files |
| **Navigation** | JavaScript page switching | Browser navigation |
| **Browser History** | No history | Full history |
| **Back Button** | Doesn't work | Works naturally |
| **URL Sharing** | Can't share specific step | Can share each step |
| **State Management** | In-memory variables | sessionStorage |
| **Page Reload** | Loses state | Maintains state |
| **SEO** | Single URL | Multiple URLs |
| **Maintainability** | All code in one file | Separated concerns |

## ✅ Advantages of Separate Pages

1. **Better UX**: Browser back button works naturally
2. **Bookmarkable**: Each step has its own URL
3. **State Persistence**: Survives page reloads
4. **Cleaner Code**: Each page has focused responsibility
5. **Easier Testing**: Test each page independently
6. **Better Analytics**: Track user progress through funnel

## 📝 Notes

- **Email Service**: Currently OTP is only logged to console. In production, integrate with an email service (SendGrid, AWS SES, etc.)
- **Security**: OTP is returned in API response for development. Remove this in production.
- **Session Management**: Using sessionStorage (cleared when tab closes). Consider localStorage for persistence or proper session tokens.
- **Error Handling**: All pages have comprehensive error handling with user-friendly messages.

---

**All three pages are ready to use!** The backend server is running and the complete flow has been tested successfully.
