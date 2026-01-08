const API_BASE_URL = 'http://localhost:8000/api';
let currentRound = 3;

const ui = {
    leaderboardBody: document.getElementById('leaderboard-body'),
    roundTabs: document.querySelectorAll('.round-tab')
};

async function fetchLeaderboard(round) {
    try {
        const response = await fetch(`${API_BASE_URL}/quiz/leaderboard/?round=${round}`);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
}

function displayLeaderboard(data) {
    if (data.length === 0) {
        ui.leaderboardBody.innerHTML = `
            <div class="empty-state">
                <p>No submissions yet for this round</p>
            </div>
        `;
        return;
    }

    ui.leaderboardBody.innerHTML = data.map((entry, index) => {
        const rank = index + 1;
        const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';
        const statusClass = entry.qualified ? 'qualified' : 'eliminated';
        const statusText = entry.qualified ? 'QUALIFIED' : 'ELIMINATED';

        return `
            <div class="leaderboard-row ${rankClass}">
                <div class="rank-col">
                    <span class="rank-number">${rank}</span>
                    ${rank <= 3 ? '<span class="rank-badge">★</span>' : ''}
                </div>
                <div class="team-col">${entry.team_name}</div>
                <div class="score-col">${entry.score}/${entry.total_questions}</div>
                <div class="percentage-col">${entry.percentage.toFixed(1)}%</div>
                <div class="status-col">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
            </div>
        `;
    }).join('');
}

async function loadLeaderboard(round) {
    ui.leaderboardBody.innerHTML = '<div class="loading-state"><div class="typing-effect">Loading rankings...</div></div>';
    const data = await fetchLeaderboard(round);
    displayLeaderboard(data);
}

function initLeaderboard() {
    ui.roundTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ui.roundTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentRound = parseInt(tab.dataset.round);
            loadLeaderboard(currentRound);
        });
    });

    loadLeaderboard(currentRound);
}

window.addEventListener('DOMContentLoaded', initLeaderboard);
