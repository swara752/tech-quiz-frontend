// Team Registration JavaScript
const API_BASE_URL = 'http://localhost:8000/api';

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
        is_team: true,
        members: []
    };

    // Member 1
    const member1 = {
        first_name: document.getElementById('member1-firstName').value,
        last_name: document.getElementById('member1-lastName').value,
        email: document.getElementById('member1-email').value,
        role: 'member'
    };
    teamData.members.push(member1);

    // Member 2
    const member2 = {
        first_name: document.getElementById('member2-firstName').value,
        last_name: document.getElementById('member2-lastName').value,
        email: document.getElementById('member2-email').value,
        role: 'member'
    };
    teamData.members.push(member2);

    // Use member1's email as team email
    teamData.email = member1.email;

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
