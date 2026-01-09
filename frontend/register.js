// Registration Page JavaScript
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

// Message Functions
function showSuccess(message) {
    const successEl = document.getElementById('successMessage');
    const errorEl = document.getElementById('errorMessage');

    errorEl.classList.add('hidden');
    successEl.textContent = message;
    successEl.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => successEl.classList.add('hidden'), 5000);
}

function showError(message) {
    const successEl = document.getElementById('successMessage');
    const errorEl = document.getElementById('errorMessage');

    successEl.classList.add('hidden');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => errorEl.classList.add('hidden'), 5000);
}

function hideMessages() {
    document.getElementById('successMessage').classList.add('hidden');
    document.getElementById('errorMessage').classList.add('hidden');
}

// Participant Registration
document.getElementById('participantForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check terms and conditions
    if (!document.getElementById('participantTerms').checked) {
        showError('Please accept the terms and conditions');
        return;
    }

    const participantData = {
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('participantEmail').value,
        phone: document.getElementById('participantPhone').value,
        college: document.getElementById('participantCollege').value,
        year: document.getElementById('participantYear').value,
        branch: document.getElementById('participantBranch').value,
        is_team: false
    };

    try {
        const response = await fetch(`${API_BASE_URL}/teams/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `${participantData.first_name} ${participantData.last_name}`,
                email: participantData.email,
                phone: participantData.phone,
                college: participantData.college,
                year: participantData.year,
                branch: participantData.branch,
                is_team: false,
                members: [{
                    first_name: participantData.first_name,
                    last_name: participantData.last_name,
                    email: participantData.email,
                    phone: participantData.phone
                }]
            })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess('Registration successful! Redirecting to login...');

            // Store registration data
            sessionStorage.setItem('registeredEmail', participantData.email);
            sessionStorage.setItem('registeredName', `${participantData.first_name} ${participantData.last_name}`);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showError(data.error || data.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please check your connection and try again.');
        console.error('Error:', error);
    }
});

// Team Registration
document.getElementById('teamForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check terms and conditions
    if (!document.getElementById('teamTerms').checked) {
        showError('Please accept the terms and conditions');
        return;
    }

    // Collect team data
    const teamData = {
        name: document.getElementById('teamName').value,
        email: document.getElementById('teamEmail').value,
        college: document.getElementById('teamCollege').value,
        is_team: true,
        members: []
    };

    // Team Leader
    const leader = {
        first_name: document.getElementById('leader-firstName').value,
        last_name: document.getElementById('leader-lastName').value,
        email: document.getElementById('leader-email').value,
        phone: document.getElementById('leader-phone').value,
        role: 'leader'
    };
    teamData.members.push(leader);

    // Member 2
    const member2 = {
        first_name: document.getElementById('member2-firstName').value,
        last_name: document.getElementById('member2-lastName').value,
        email: document.getElementById('member2-email').value,
        phone: document.getElementById('member2-phone').value,
        role: 'member'
    };
    teamData.members.push(member2);

    // Member 3 (Optional)
    const member3FirstName = document.getElementById('member3-firstName').value;
    if (member3FirstName) {
        const member3 = {
            first_name: member3FirstName,
            last_name: document.getElementById('member3-lastName').value,
            email: document.getElementById('member3-email').value,
            phone: document.getElementById('member3-phone').value,
            role: 'member'
        };
        teamData.members.push(member3);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/teams/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData)
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess('Team registration successful! Redirecting to login...');

            // Store registration data
            sessionStorage.setItem('registeredEmail', teamData.email);
            sessionStorage.setItem('registeredTeamName', teamData.name);
            sessionStorage.setItem('isTeam', 'true');

            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showError(data.error || data.message || 'Team registration failed. Please try again.');
        }
    } catch (error) {
        showError('Network error. Please check your connection and try again.');
        console.error('Error:', error);
    }
});

// Phone number validation
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
        // Remove non-numeric characters except + and spaces
        let value = e.target.value.replace(/[^\d+\s]/g, '');
        e.target.value = value;
    });
});

// Email validation
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', (e) => {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            e.target.style.borderColor = '#f87171';
            showError('Please enter a valid email address');
        } else {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }
    });
});

// Pre-fill from session storage if coming from another page
window.addEventListener('load', () => {
    const registeredEmail = sessionStorage.getItem('registeredEmail');
    if (registeredEmail) {
        // Clear session storage
        sessionStorage.removeItem('registeredEmail');
        sessionStorage.removeItem('registeredName');
        sessionStorage.removeItem('registeredTeamName');
        sessionStorage.removeItem('isTeam');
    }
});
