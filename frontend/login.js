// Login Page JavaScript
const API_BASE_URL = 'http://localhost:8000/api';

// Tab Switching
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;

        // Update active tab button
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Clear messages
        hideMessages();
    });
});

// OTP Input Auto-focus
function setupOTPInputs(containerClass = '') {
    const otpInputs = document.querySelectorAll(`.otp-input${containerClass}`);

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;

            if (value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        // Only allow numbers
        input.addEventListener('keypress', (e) => {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });
}

setupOTPInputs();
setupOTPInputs('.team-otp');

// Message Functions
function showSuccess(message) {
    const successEl = document.getElementById('successMessage');
    const errorEl = document.getElementById('errorMessage');

    errorEl.classList.add('hidden');
    successEl.textContent = message;
    successEl.classList.remove('hidden');

    setTimeout(() => successEl.classList.add('hidden'), 5000);
}

function showError(message) {
    const successEl = document.getElementById('successMessage');
    const errorEl = document.getElementById('errorMessage');

    successEl.classList.add('hidden');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');

    setTimeout(() => errorEl.classList.add('hidden'), 5000);
}

function hideMessages() {
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
}

// Get OTP from inputs
function getOTP(containerClass = '') {
    const inputs = document.querySelectorAll(`.otp-input${containerClass}`);
    return Array.from(inputs).map(input => input.value).join('');
}

// Clear OTP inputs
function clearOTP(containerClass = '') {
    const inputs = document.querySelectorAll(`.otp-input${containerClass}`);
    inputs.forEach(input => input.value = '');
    inputs[0].focus();
}

// Participant Form Submission
document.getElementById('participantForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('participantEmail').value;
    const name = document.getElementById('participantName').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/send_otp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: name,
                is_team: false
            })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess('OTP sent successfully! Check your email.');
            document.getElementById('participantForm').classList.add('hidden');
            document.getElementById('participantOtpSection').classList.remove('hidden');

            // Store email for verification
            sessionStorage.setItem('participantEmail', email);
            sessionStorage.setItem('participantName', name);
        } else {
            showError(data.error || 'Failed to send OTP. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please check your connection.');
        console.error('Error:', error);
    }
});

// Participant OTP Verification
document.getElementById('verifyParticipantOtp').addEventListener('click', async () => {
    const otp = getOTP();
    const email = sessionStorage.getItem('participantEmail');

    if (otp.length !== 6) {
        showError('Please enter complete 6-digit OTP');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify_otp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                otp: otp
            })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess('Verification successful! Redirecting to quiz...');

            // Store participant data
            sessionStorage.setItem('participantId', data.participant_id || data.team_id);
            sessionStorage.setItem('participantName', sessionStorage.getItem('participantName'));

            // Redirect to bubbler/waiting room
            setTimeout(() => {
                window.location.href = 'bubbler.html';
            }, 1500);
        } else {
            showError(data.error || 'Invalid OTP. Please try again.');
            clearOTP();
        }
    } catch (error) {
        showError('Network error. Please check your connection.');
        console.error('Error:', error);
    }
});

// Resend Participant OTP
document.getElementById('resendParticipantOtp').addEventListener('click', async () => {
    const email = sessionStorage.getItem('participantEmail');
    const name = sessionStorage.getItem('participantName');

    try {
        const response = await fetch(`${API_BASE_URL}/auth/send_otp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                name: name,
                is_team: false
            })
        });

        if (response.ok) {
            showSuccess('New OTP sent successfully!');
            clearOTP();
        } else {
            showError('Failed to resend OTP. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please check your connection.');
        console.error('Error:', error);
    }
});

// Team Form Submission
document.getElementById('teamForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const teamName = document.getElementById('teamName').value;
    const teamEmail = document.getElementById('teamEmail').value;
    const member1 = document.getElementById('member1').value;
    const member2 = document.getElementById('member2').value;
    const member3 = document.getElementById('member3').value;

    const members = [member1, member2];
    if (member3) members.push(member3);

    try {
        const response = await fetch(`${API_BASE_URL}/auth/send_otp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: teamEmail,
                name: teamName,
                is_team: true,
                members: members
            })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess('OTP sent successfully! Check your team email.');
            document.getElementById('teamForm').classList.add('hidden');
            document.getElementById('teamOtpSection').classList.remove('hidden');

            // Store team data for verification
            sessionStorage.setItem('teamEmail', teamEmail);
            sessionStorage.setItem('teamName', teamName);
            sessionStorage.setItem('teamMembers', JSON.stringify(members));
        } else {
            showError(data.error || 'Failed to send OTP. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please check your connection.');
        console.error('Error:', error);
    }
});

// Team OTP Verification
document.getElementById('verifyTeamOtp').addEventListener('click', async () => {
    const otp = getOTP('.team-otp');
    const email = sessionStorage.getItem('teamEmail');

    if (otp.length !== 6) {
        showError('Please enter complete 6-digit OTP');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify_otp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                otp: otp
            })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess('Verification successful! Redirecting to quiz...');

            // Store team data
            sessionStorage.setItem('teamId', data.team_id || data.participant_id);
            sessionStorage.setItem('teamName', sessionStorage.getItem('teamName'));
            sessionStorage.setItem('isTeam', 'true');

            // Redirect to bubbler/waiting room
            setTimeout(() => {
                window.location.href = 'bubbler.html';
            }, 1500);
        } else {
            showError(data.error || 'Invalid OTP. Please try again.');
            clearOTP('.team-otp');
        }
    } catch (error) {
        showError('Network error. Please check your connection.');
        console.error('Error:', error);
    }
});

// Resend Team OTP
document.getElementById('resendTeamOtp').addEventListener('click', async () => {
    const teamEmail = sessionStorage.getItem('teamEmail');
    const teamName = sessionStorage.getItem('teamName');
    const members = JSON.parse(sessionStorage.getItem('teamMembers'));

    try {
        const response = await fetch(`${API_BASE_URL}/auth/send_otp/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: teamEmail,
                name: teamName,
                is_team: true,
                members: members
            })
        });

        if (response.ok) {
            showSuccess('New OTP sent successfully!');
            clearOTP('.team-otp');
        } else {
            showError('Failed to resend OTP. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please check your connection.');
        console.error('Error:', error);
    }
});
