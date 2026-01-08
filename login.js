const API_BASE_URL = 'http://localhost:8000/api';

const ui = {
    teamName: document.getElementById('team-name'),
    teamEmail: document.getElementById('team-email'),
    sendOtpBtn: document.getElementById('send-otp-btn'),
    otpSection: document.getElementById('otp-section'),
    otpInput: document.getElementById('otp-input'),
    verifyOtpBtn: document.getElementById('verify-otp-btn'),
    otpDisplay: document.getElementById('otp-display'),
    otpCode: document.getElementById('otp-code'),
    errorMsg: document.getElementById('error-msg')
};

function showError(message) {
    ui.errorMsg.textContent = message;
    ui.errorMsg.classList.remove('hidden');
    setTimeout(() => ui.errorMsg.classList.add('hidden'), 5000);
}

async function sendOTP() {
    const name = ui.teamName.value.trim();
    const email = ui.teamEmail.value.trim();

    if (!name || !email) {
        showError('Please enter both team name and email');
        return;
    }

    ui.sendOtpBtn.disabled = true;
    ui.sendOtpBtn.textContent = 'SENDING...';

    try {
        const response = await fetch(`${API_BASE_URL}/auth/send_otp/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) throw new Error('Failed to send OTP');

        const data = await response.json();

        ui.otpCode.textContent = data.otp;
        ui.otpDisplay.classList.remove('hidden');
        ui.otpSection.classList.remove('hidden');
        ui.sendOtpBtn.textContent = 'OTP_SENT';

        ui.teamName.disabled = true;
        ui.teamEmail.disabled = true;

    } catch (error) {
        console.error('Error sending OTP:', error);
        showError('Failed to send OTP. Please try again.');
        ui.sendOtpBtn.disabled = false;
        ui.sendOtpBtn.textContent = 'SEND_OTP';
    }
}

async function verifyOTP() {
    const email = ui.teamEmail.value.trim();
    const otp = ui.otpInput.value.trim();

    if (!otp || otp.length !== 6) {
        showError('Please enter a valid 6-digit OTP');
        return;
    }

    ui.verifyOtpBtn.disabled = true;
    ui.verifyOtpBtn.textContent = 'VERIFYING...';

    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify_otp/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Verification failed');
        }

        const data = await response.json();

        localStorage.setItem('teamId', data.team_id);
        localStorage.setItem('teamName', data.team_name);
        localStorage.setItem('isAuthenticated', 'true');

        window.location.href = 'round1.html';

    } catch (error) {
        console.error('Error verifying OTP:', error);
        showError(error.message || 'Invalid OTP. Please try again.');
        ui.verifyOtpBtn.disabled = false;
        ui.verifyOtpBtn.textContent = 'VERIFY_AND_START';
    }
}

ui.sendOtpBtn.addEventListener('click', sendOTP);
ui.verifyOtpBtn.addEventListener('click', verifyOTP);

ui.teamEmail.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendOTP();
});

ui.otpInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyOTP();
});
