// Round 1 Quiz - Enhanced Version with 20-minute timer and navigation
// All data stored in localStorage

const TOTAL_TIME = 20 * 60; // 20 minutes in seconds
const TOTAL_QUESTIONS = 20;
const STORAGE_PREFIX = 'round1_';

// Sample Questions Data (20 questions)
const quizData = [
    { id: 1, q: "What is Machine Learning?", options: ["Programming with rules", "Learning from data without explicit programming", "Writing AI hardware", "Using databases only"], correct: 1 },
    { id: 2, q: "Which algorithm is used for classification problems?", options: ["Linear Regression", "K-Means", "Decision Tree", "Apriori"], correct: 2 },
    { id: 3, q: "What is training data?", options: ["Data used after prediction", "Data used to test accuracy", "Data used to teach the model", "Random unused data"], correct: 2 },
    { id: 4, q: "Which language is most popular for ML?", options: ["C", "Java", "Python", "HTML"], correct: 2 },
    { id: 5, q: "What does 'phishing' mean?", options: ["Fishing online", "Stealing data using fake messages", "Breaking servers", "Encrypting files"], correct: 1 },
    { id: 6, q: "What is a firewall?", options: ["Virus", "Security camera", "Network security device", "Password manager"], correct: 2 },
    { id: 7, q: "Which one is a strong password?", options: ["123456", "password", "Abc@1234", "qwerty"], correct: 2 },
    { id: 8, q: "What does HTTPS indicate?", options: ["Fast website", "Free website", "Secure website", "Government website"], correct: 2 },
    { id: 9, q: "What is cloud computing?", options: ["Using weather data", "Storing data on local disk", "Using internet-based servers", "Writing cloud software"], correct: 2 },
    { id: 10, q: "Which is a cloud service provider?", options: ["Oracle", "AWS", "Linux", "MySQL"], correct: 1 },
    { id: 11, q: "What does SaaS stand for?", options: ["Software as a Service", "System as a Service", "Storage as a Software", "Server as a Software"], correct: 0 },
    { id: 12, q: "Which cloud model offers virtual machines?", options: ["SaaS", "PaaS", "IaaS", "DBaaS"], correct: 2 },
    { id: 13, q: "What is data science mainly about?", options: ["Writing code only", "Analyzing data for insights", "Designing websites", "Network security"], correct: 1 },
    { id: 14, q: "Which library is used for data analysis in Python?", options: ["NumPy", "Pandas", "Matplotlib", "All of the above"], correct: 3 },
    { id: 15, q: "What is data visualization?", options: ["Data storage", "Data encryption", "Showing data graphically", "Deleting data"], correct: 2 },
    { id: 16, q: "Which tool is commonly used for data analysis?", options: ["Excel", "MS Paint", "Notepad", "Calculator"], correct: 0 },
    { id: 17, q: "What does Big Data mean?", options: ["Small datasets", "Structured data only", "Very large and complex data", "Backup data"], correct: 2 },
    { id: 18, q: "Which is a Big Data framework?", options: ["Hadoop", "Python", "Windows", "Oracle"], correct: 0 },
    { id: 19, q: "What are the 3 V's of Big Data?", options: ["Value, Vision, Volume", "Volume, Velocity, Variety", "Volume, Version, View", "Velocity, Value, View"], correct: 1 },
    { id: 20, q: "Which company heavily uses Big Data?", options: ["Netflix", "Small shops", "Offline stores", "Calculators"], correct: 0 }
];

// State Management
let state = {
    currentQuestion: 0,
    answers: {},
    reviewMarked: [],
    timeRemaining: TOTAL_TIME,
    timerInterval: null
};

// DOM Elements
const elements = {
    timer: document.getElementById('timer'),
    gridBtn: document.getElementById('grid-btn'),
    submitBtn: document.getElementById('submit-btn'),
    gridModal: document.getElementById('grid-modal'),
    confirmModal: document.getElementById('confirm-modal'),
    closeGrid: document.getElementById('close-grid'),
    cancelSubmit: document.getElementById('cancel-submit'),
    confirmSubmit: document.getElementById('confirm-submit'),
    questionGrid: document.getElementById('question-grid'),
    questionNumber: document.getElementById('question-number'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    prevBtn: document.getElementById('prev-btn'),
    reviewBtn: document.getElementById('review-btn'),
    nextBtn: document.getElementById('next-btn')
};

// Initialize Quiz
function initQuiz() {
    loadState();
    createQuestionGrid();
    loadQuestion(state.currentQuestion);
    startTimer();
    attachEventListeners();
}

// Load State from localStorage
function loadState() {
    const savedAnswers = localStorage.getItem(STORAGE_PREFIX + 'answers');
    const savedReview = localStorage.getItem(STORAGE_PREFIX + 'review');
    const savedTime = localStorage.getItem(STORAGE_PREFIX + 'timer');
    const savedCurrent = localStorage.getItem(STORAGE_PREFIX + 'current');

    if (savedAnswers) state.answers = JSON.parse(savedAnswers);
    if (savedReview) state.reviewMarked = JSON.parse(savedReview);
    if (savedTime) state.timeRemaining = parseInt(savedTime);
    if (savedCurrent) state.currentQuestion = parseInt(savedCurrent);
}

// Save State to localStorage
function saveState() {
    localStorage.setItem(STORAGE_PREFIX + 'answers', JSON.stringify(state.answers));
    localStorage.setItem(STORAGE_PREFIX + 'review', JSON.stringify(state.reviewMarked));
    localStorage.setItem(STORAGE_PREFIX + 'timer', state.timeRemaining.toString());
    localStorage.setItem(STORAGE_PREFIX + 'current', state.currentQuestion.toString());
}

// Create Question Grid
function createQuestionGrid() {
    elements.questionGrid.innerHTML = '';
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        const btn = document.createElement('button');
        btn.className = 'grid-item';
        btn.textContent = i + 1;
        btn.onclick = () => navigateToQuestion(i);
        elements.questionGrid.appendChild(btn);
    }
    updateQuestionGrid();
}

// Update Question Grid Colors
function updateQuestionGrid() {
    const gridItems = elements.questionGrid.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.classList.remove('answered', 'review', 'current');

        if (index === state.currentQuestion) {
            item.classList.add('current');
        }

        if (state.reviewMarked.includes(index)) {
            item.classList.add('review');
        } else if (state.answers[quizData[index].id] !== undefined) {
            item.classList.add('answered');
        }
    });
}

// Load Question
function loadQuestion(index) {
    const question = quizData[index];
    state.currentQuestion = index;

    elements.questionNumber.textContent = `Question ${index + 1} of ${TOTAL_QUESTIONS}`;
    elements.questionText.textContent = question.q;

    // Load options
    elements.optionsContainer.innerHTML = '';
    question.options.forEach((option, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;

        // Check if this option was previously selected
        if (state.answers[question.id] === i) {
            btn.classList.add('selected');
        }

        btn.onclick = () => selectOption(i, question.id);
        elements.optionsContainer.appendChild(btn);
    });

    // Update navigation buttons
    elements.prevBtn.disabled = (index === 0);
    elements.nextBtn.textContent = (index === TOTAL_QUESTIONS - 1) ? 'Finish' : 'Next';

    // Update review button
    if (state.reviewMarked.includes(index)) {
        elements.reviewBtn.classList.add('active');
    } else {
        elements.reviewBtn.classList.remove('active');
    }

    updateQuestionGrid();
    saveState();
}

// Select Option
function selectOption(optionIndex, questionId) {
    state.answers[questionId] = optionIndex;

    // Update UI
    const optionBtns = elements.optionsContainer.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, i) => {
        btn.classList.remove('selected');
        if (i === optionIndex) {
            btn.classList.add('selected');
        }
    });

    updateQuestionGrid();
    saveState();
}

// Navigate to Question
function navigateToQuestion(index) {
    if (index >= 0 && index < TOTAL_QUESTIONS) {
        loadQuestion(index);
        closeModal(elements.gridModal);
    }
}

// Previous Question
function previousQuestion() {
    if (state.currentQuestion > 0) {
        loadQuestion(state.currentQuestion - 1);
    }
}

// Next Question
function nextQuestion() {
    if (state.currentQuestion < TOTAL_QUESTIONS - 1) {
        loadQuestion(state.currentQuestion + 1);
    } else {
        // Last question - show submit confirmation
        showModal(elements.confirmModal);
    }
}

// Toggle Review Mark
function toggleReview() {
    const index = state.currentQuestion;
    const reviewIndex = state.reviewMarked.indexOf(index);

    if (reviewIndex > -1) {
        state.reviewMarked.splice(reviewIndex, 1);
        elements.reviewBtn.classList.remove('active');
    } else {
        state.reviewMarked.push(index);
        elements.reviewBtn.classList.add('active');
    }

    updateQuestionGrid();
    saveState();
}

// Timer Functions
function startTimer() {
    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();
        saveState();

        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            autoSubmit();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Add urgent class when less than 2 minutes
    if (state.timeRemaining < 120) {
        elements.timer.classList.add('urgent');
    } else {
        elements.timer.classList.remove('urgent');
    }
}

// Modal Functions
function showModal(modal) {
    modal.classList.remove('hidden');
}

function closeModal(modal) {
    modal.classList.add('hidden');
}

// Submit Quiz
function submitQuiz() {
    clearInterval(state.timerInterval);

    // Calculate score
    let score = 0;
    quizData.forEach(question => {
        if (state.answers[question.id] === question.correct) {
            score++;
        }
    });

    // Store results
    localStorage.setItem(STORAGE_PREFIX + 'score', score.toString());
    localStorage.setItem(STORAGE_PREFIX + 'completed', 'true');

    // Clear quiz state
    localStorage.removeItem(STORAGE_PREFIX + 'answers');
    localStorage.removeItem(STORAGE_PREFIX + 'review');
    localStorage.removeItem(STORAGE_PREFIX + 'timer');
    localStorage.removeItem(STORAGE_PREFIX + 'current');

    // Redirect to results or next round
    alert(`Quiz Submitted!\nYour Score: ${score}/${TOTAL_QUESTIONS}\n\nRedirecting to leaderboard...`);
    window.location.href = 'leaderboard.html';
}

function autoSubmit() {
    alert('Time is up! Your quiz will be submitted automatically.');
    submitQuiz();
}

// Event Listeners
function attachEventListeners() {
    elements.gridBtn.onclick = () => showModal(elements.gridModal);
    elements.submitBtn.onclick = () => showModal(elements.confirmModal);
    elements.closeGrid.onclick = () => closeModal(elements.gridModal);
    elements.cancelSubmit.onclick = () => closeModal(elements.confirmModal);
    elements.confirmSubmit.onclick = submitQuiz;
    elements.prevBtn.onclick = previousQuestion;
    elements.nextBtn.onclick = nextQuestion;
    elements.reviewBtn.onclick = toggleReview;

    // Close grid modal when clicking outside
    elements.gridModal.onclick = (e) => {
        if (e.target === elements.gridModal) {
            closeModal(elements.gridModal);
        }
    };

    // Prevent accidental page close
    window.onbeforeunload = () => {
        if (!localStorage.getItem(STORAGE_PREFIX + 'completed')) {
            return 'Are you sure you want to leave? Your progress will be saved.';
        }
    };
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initQuiz);
