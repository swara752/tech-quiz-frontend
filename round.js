const API_BASE_URL = 'http://localhost:8000/api';

let currentRound = 1;
let roundQuestions = [];
let config = {};
let teamId = null;

const currentPage = window.location.pathname.split('/').pop();
if (currentPage.includes('round2')) currentRound = 2;
else if (currentPage.includes('round3')) currentRound = 3;

const ROUND_CONFIG = {
    1: { name: "Round 1: Beginner", count: 20, timePerQuestion: 60, passPercentage: 50 },
    2: { name: "Round 2: Moderate", count: 10, timePerQuestion: 30, passPercentage: 60 },
    3: { name: "Round 3: Final", count: 5, timePerQuestion: 0, passPercentage: 0 }
};

config = ROUND_CONFIG[currentRound];

let state = {
    currentQuestionIndex: 0,
    totalQuestions: 0,
    timeLeft: config.timePerQuestion,
    timerInterval: null,
    answers: {},
    isLocked: false,
    tabSwitchCount: 0
};

const ui = {
    timerDisplay: document.getElementById('timer-display'),
    timerBox: document.getElementById('timer-box'),
    currentQ: document.getElementById('current-q'),
    totalQ: document.getElementById('total-q'),
    progressBar: document.getElementById('progress-bar'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    nextBtn: document.getElementById('next-btn'),
    submitBtn: document.getElementById('submit-round-btn'),
    footerMsg: document.getElementById('footer-msg'),
    warningModal: document.getElementById('warning-modal'),
    confirmModal: document.getElementById('confirm-modal'),
    closeWarningBtn: document.getElementById('close-warning'),
    cancelSubmitBtn: document.getElementById('cancel-submit'),
    confirmSubmitBtn: document.getElementById('confirm-submit')
};

async function fetchQuestions() {
    try {
        const response = await fetch(`${API_BASE_URL}/questions/by_round/?round=${currentRound}`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        alert('Failed to load questions. Please check if the backend server is running.');
        return [];
    }
}

async function getOrCreateTeam() {
    let storedTeamId = localStorage.getItem('teamId');

    if (storedTeamId) {
        return parseInt(storedTeamId);
    }

    const teamName = prompt('Enter your team name:');
    const teamEmail = prompt('Enter your team email:');

    if (!teamName || !teamEmail) {
        alert('Team name and email are required!');
        return null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/teams/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: teamName, email: teamEmail })
        });

        if (!response.ok) throw new Error('Failed to create team');
        const team = await response.json();
        localStorage.setItem('teamId', team.id);
        return team.id;
    } catch (error) {
        console.error('Error creating team:', error);
        alert('Failed to create team. Please try again.');
        return null;
    }
}

async function initQuiz() {
    teamId = await getOrCreateTeam();
    if (!teamId) return;

    roundQuestions = await fetchQuestions();
    if (roundQuestions.length === 0) return;

    state.totalQuestions = roundQuestions.length;
    ui.totalQ.innerText = state.totalQuestions.toString().padStart(2, '0');

    setTimeout(() => {
        loadQuestion(state.currentQuestionIndex);

        ui.nextBtn.addEventListener('click', handleNext);
        ui.submitBtn.addEventListener('click', () => showModal(ui.confirmModal));
        ui.confirmSubmitBtn.addEventListener('click', finishRound);
        ui.cancelSubmitBtn.addEventListener('click', () => hideModal(ui.confirmModal));
        ui.closeWarningBtn.addEventListener('click', () => hideModal(ui.warningModal));

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                e.preventDefault();
            }
        });
    }, 2000);
}

function loadQuestion(index) {
    const qData = roundQuestions[index];
    if (!qData) return;

    state.isLocked = false;
    ui.nextBtn.disabled = true;
    ui.footerMsg.innerText = "SELECT_OPTION_TO_LOCK_ANSWER";
    ui.questionText.innerHTML = qData.text;

    if (config.timePerQuestion > 0) {
        clearInterval(state.timerInterval);
        state.timeLeft = config.timePerQuestion;
        startTimer();
    } else {
        clearInterval(state.timerInterval);
        ui.timerDisplay.innerText = "∞";
        ui.timerBox.classList.remove('timer-urgent');
    }

    ui.optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    qData.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.dataset.index = i;
        btn.innerHTML = `
            <span class="option-marker">${letters[i]}</span>
            <span class="option-text">${opt}</span>
        `;
        btn.addEventListener('click', () => handleOptionClick(i, btn, qData.id));
        ui.optionsContainer.appendChild(btn);
    });

    const displayNum = (index + 1).toString().padStart(2, '0');
    ui.currentQ.innerText = displayNum;
    const progressPercent = ((index) / state.totalQuestions) * 100;
    ui.progressBar.style.width = `${progressPercent}%`;
}

function handleOptionClick(selectedIndex, btnElement, questionId) {
    if (state.isLocked) return;

    state.isLocked = true;
    state.answers[questionId] = selectedIndex;

    btnElement.classList.add('selected');

    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(btn => btn.disabled = true);

    if (state.currentQuestionIndex < state.totalQuestions - 1) {
        ui.nextBtn.disabled = false;
        ui.footerMsg.innerText = "ANSWER_LOCKED >> PROCEED_TO_NEXT";
    } else {
        ui.nextBtn.classList.add('hidden');
        ui.submitBtn.classList.remove('hidden');
        ui.footerMsg.innerText = "FINAL_ANSWER_LOCKED >> SUBMIT_ROUND";
    }
}

function handleNext() {
    if (state.currentQuestionIndex < state.totalQuestions - 1) {
        state.currentQuestionIndex++;
        loadQuestion(state.currentQuestionIndex);
    }
}

function startTimer() {
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();

        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            finishRound(true);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    ui.timerDisplay.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    if (state.timeLeft < 60) {
        ui.timerBox.classList.add('timer-urgent');
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        state.tabSwitchCount++;
        if (state.tabSwitchCount === 1) {
            showModal(ui.warningModal);
        } else if (state.tabSwitchCount >= 2) {
            finishRound(true);
        }
    }
}

function showModal(modal) {
    modal.classList.remove('hidden');
}

function hideModal(modal) {
    modal.classList.add('hidden');
}

async function finishRound(auto = false) {
    clearInterval(state.timerInterval);
    hideModal(ui.confirmModal);

    const answersArray = Object.entries(state.answers).map(([questionId, selectedOption]) => ({
        question_id: parseInt(questionId),
        selected_option: selectedOption
    }));

    try {
        const response = await fetch(`${API_BASE_URL}/quiz/submit_round/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                team_id: teamId,
                round: currentRound,
                answers: answersArray
            })
        });

        if (!response.ok) throw new Error('Failed to submit round');

        const result = await response.json();

        if (currentRound === 3) {
            alert(`Quiz Complete!\nYour Score: ${result.score}/${result.total}\n(Redirect to leaderboard)`);
        } else {
            if (result.qualified) {
                alert(`Round ${currentRound} Complete!\nScore: ${result.score}/${result.total} (${result.percentage.toFixed(1)}%)\nQualified for Round ${result.next_round}!`);
                window.location.href = `round${result.next_round}.html`;
            } else {
                window.location.href = `greet.html?score=${result.score}&total=${result.total}&round=${currentRound}`;
            }
        }
    } catch (error) {
        console.error('Error submitting round:', error);
        alert('Failed to submit answers. Please check your connection.');
    }
}

window.addEventListener('DOMContentLoaded', initQuiz);
