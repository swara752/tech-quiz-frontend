/**
 * Tech Quiz Web Application - Frontend Logic
 * Handles round management, timer, navigation, buzzer-behavior, and anti-cheating.
 */

// --- Quiz Data (Real Questions) ---
// Organized by rounds: Beginner (20Q, 1min each), Moderate (10Q, 30s each), Final (5Q, no time limit)

const quizData = [
    // --- ROUND 1: BEGINNER (20 Questions - 1 minute each) ---
    // AI/ML (4 Questions)
    { id: 1, round: 1, domain: "AI/ML", text: "What is Machine Learning?", options: ["Programming with rules", "Learning from data without explicit programming", "Writing AI hardware", "Using databases only"], correct: 1 },
    { id: 2, round: 1, domain: "AI/ML", text: "Which algorithm is used for classification problems?", options: ["Linear Regression", "K-Means", "Decision Tree", "Apriori"], correct: 2 },
    { id: 3, round: 1, domain: "AI/ML", text: "What is training data?", options: ["Data used after prediction", "Data used to test accuracy", "Data used to teach the model", "Random unused data"], correct: 2 },
    { id: 4, round: 1, domain: "AI/ML", text: "Which language is most popular for ML?", options: ["C", "Java", "Python", "HTML"], correct: 2 },

    // Cybersecurity (4 Questions)
    { id: 5, round: 1, domain: "Cybersecurity", text: "What does 'phishing' mean?", options: ["Fishing online", "Stealing data using fake messages", "Breaking servers", "Encrypting files"], correct: 1 },
    { id: 6, round: 1, domain: "Cybersecurity", text: "What is a firewall?", options: ["Virus", "Security camera", "Network security device", "Password manager"], correct: 2 },
    { id: 7, round: 1, domain: "Cybersecurity", text: "Which one is a strong password?", options: ["123456", "password", "Abc@1234", "qwerty"], correct: 2 },
    { id: 8, round: 1, domain: "Cybersecurity", text: "What does HyperText Transfer Protocol Secure indicate?", options: ["Fast website", "Free website", "Secure website", "Government website"], correct: 2 },

    // Cloud Computing (4 Questions)
    { id: 9, round: 1, domain: "Cloud", text: "What is cloud computing?", options: ["Using weather data", "Storing data on local disk", "Using internet-based servers", "Writing cloud software"], correct: 2 },
    { id: 10, round: 1, domain: "Cloud", text: "Which is a cloud service provider?", options: ["Oracle", "AWS", "Linux", "MySQL"], correct: 1 },
    { id: 11, round: 1, domain: "Cloud", text: "What does SaaS stand for?", options: ["Software as a Service", "System as a Service", "Storage as a Software", "Server as a Software"], correct: 0 },
    { id: 12, round: 1, domain: "Cloud", text: "Which cloud model offers virtual machines?", options: ["SaaS", "PaaS", "IaaS", "DBaaS"], correct: 2 },

    // Data Science (4 Questions)
    { id: 13, round: 1, domain: "Data Science", text: "What is data science mainly about?", options: ["Writing code only", "Analyzing data for insights", "Designing websites", "Network security"], correct: 1 },
    { id: 14, round: 1, domain: "Data Science", text: "Which library is used for data analysis in Python?", options: ["NumPy", "Pandas", "Matplotlib", "All of the above"], correct: 3 },
    { id: 15, round: 1, domain: "Data Science", text: "What is data visualization?", options: ["Data storage", "Data encryption", "Showing data graphically", "Deleting data"], correct: 2 },
    { id: 16, round: 1, domain: "Data Science", text: "Which tool is commonly used for data analysis?", options: ["Excel", "MS Paint", "Notepad", "Calculator"], correct: 0 },

    // Big Data (4 Questions)
    { id: 17, round: 1, domain: "Big Data", text: "What does Big Data mean?", options: ["Small datasets", "Structured data only", "Very large and complex data", "Backup data"], correct: 2 },
    { id: 18, round: 1, domain: "Big Data", text: "Which is a Big Data framework?", options: ["Hadoop", "Python", "Windows", "Oracle"], correct: 0 },
    { id: 19, round: 1, domain: "Big Data", text: "What are the 3 V's of Big Data?", options: ["Value, Vision, Volume", "Volume, Velocity, Variety", "Volume, Version, View", "Velocity, Value, View"], correct: 1 },
    { id: 20, round: 1, domain: "Big Data", text: "Which company heavily uses Big Data?", options: ["Netflix", "Small shops", "Offline stores", "Calculators"], correct: 0 },

    // --- ROUND 2: MODERATE (10 Questions - 30 seconds each) ---
    // AI/ML (2 Questions)
    { id: 21, round: 2, domain: "AI/ML", text: "In machine learning, models sometimes perform very well on training data but poorly on new data. Which technique is commonly used to reduce this overfitting problem?", options: ["Increasing number of epochs", "Adding more features", "Regularization", "Increasing learning rate"], correct: 2 },
    { id: 22, round: 2, domain: "AI/ML", text: "Some machine learning algorithms classify new data points by comparing them with nearby known data points. Which algorithm works based on the concept of 'nearest neighbors'?", options: ["Naive Bayes", "K-N-N", "Decision Tree", "Logistic Regression"], correct: 1 },

    // Cybersecurity (2 Questions)
    { id: 23, round: 2, domain: "Cybersecurity", text: "A cyberattack floods a server with an extremely large amount of traffic from multiple sources. What is the primary goal of this type of Distributed Denial-of-Service (DDoS) attack?", options: ["Steal sensitive data", "Modify database records", "Make a service unavailable", "Gain administrator access"], correct: 2 },
    { id: 24, round: 2, domain: "Cybersecurity", text: "Encryption techniques are classified based on how many keys are used for securing data. Which encryption method uses the same key for both encryption and decryption?", options: ["RSA", "Asymmetric encryption", "Symmetric encryption", "Hashing"], correct: 2 },

    // Cloud Computing (2 Questions)
    { id: 25, round: 2, domain: "Cloud", text: "Cloud computing allows organizations to adjust resources based on workload demand. What is the main advantage of cloud computing over traditional on-premise infrastructure?", options: ["Fixed pricing", "Limited scalability", "On-demand scalability", "Manual server management"], correct: 2 },
    { id: 26, round: 2, domain: "Cloud", text: "Cloud providers offer different services for computing, databases, and storage. Which AWS service is mainly used to store large amounts of unstructured data such as images and videos?", options: ["EC2", "RDS", "S3", "Lambda"], correct: 2 },

    // Data Science (2 Questions)
    { id: 27, round: 2, domain: "Data Science", text: "In data analysis, understanding how spread out the data values are is very important. Which statistical measure represents the dispersion of data around its mean?", options: ["Mean", "Median", "Variance", "Mode"], correct: 2 },
    { id: 28, round: 2, domain: "Data Science", text: "Visualizing data helps identify trends and relationships between variables. Which type of chart is best suited for showing the relationship between two numerical variables?", options: ["Histogram", "Bar chart", "Scatter plot", "Pie chart"], correct: 2 },

    // Big Data (2 Questions)
    { id: 29, round: 2, domain: "Big Data", text: "Big data frameworks differ in how they process and store large datasets. What is the key performance advantage of Apache Spark when compared to Hadoop MapReduce?", options: ["Better user interface", "In-memory data processing", "Smaller file size", "Built-in visualization"], correct: 1 },
    { id: 30, round: 2, domain: "Big Data", text: "Hadoop consists of multiple components that handle storage and processing. Which Hadoop component is responsible for storing data across multiple machines in a fault-tolerant way?", options: ["YARN", "MapReduce", "HDFS", "Spark"], correct: 2 },

    // --- ROUND 3: FINAL (5 Questions - No time limit) ---
    { id: 31, round: 3, domain: "AI/ML", text: "Which optimization algorithm is commonly used to train neural networks?", options: ["K-Means", "Apriori", "Gradient Descent", "FP-Growth"], correct: 2 },
    { id: 32, round: 3, domain: "Cybersecurity", text: "Which cybersecurity principle ensures data is not altered by unauthorized users?", options: ["Confidentiality", "Availability", "Integrity", "Authentication"], correct: 2 },
    { id: 33, round: 3, domain: "Cloud", text: "In cloud computing, which service model provides the highest level of control to the user?", options: ["SaaS", "PaaS", "IaaS", "FaaS"], correct: 2 },
    { id: 34, round: 3, domain: "Data Science", text: "Which technique is used to evaluate the performance of a machine learning model on unseen data?", options: ["Feature scaling", "Cross-validation", "Data cleaning", "Data wrangling"], correct: 1 },
    { id: 35, round: 3, domain: "Big Data", text: "What is the main role of a NameNode in Hadoop?", options: ["Stores actual data blocks", "Executes MapReduce jobs", "Manages metadata of HDFS", "Performs data visualization"], correct: 2 }
];

// --- Configuration & State ---
const ROUND_CONFIG = [
    { name: "Round 1: Beginner", count: 20, timePerQuestion: 60 },  // 1 min per Q
    { name: "Round 2: Moderate", count: 10, timePerQuestion: 30 },  // 30s per Q
    { name: "Round 3: Final", count: 5, timePerQuestion: 0 }        // No time limit
];

// State
let currentState = {
    currentRound: 0, // 0 = Round 1, 1 = Round 2, 2 = Round 3
    currentQuestionIndex: 0, // Global index in quizData array
    totalQuestions: 35, // Total across all rounds
    timeLeft: 0, // Will be set per question based on round
    timerInterval: null,
    answers: {},
    isLocked: false,
    tabSwitchCount: 0
};

// --- DOM Elements ---
const ui = {
    timerDisplay: document.getElementById('timer-display'),
    timerBox: document.getElementById('timer-box'),
    currentQ: document.getElementById('current-q'),
    totalQ: document.getElementById('total-q'),
    progressBar: document.getElementById('progress-bar'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    nextBtn: document.getElementById('next-btn'),
    submitBtn: document.getElementById('submit-quiz-btn'),
    footerMsg: document.getElementById('footer-msg'),
    warningModal: document.getElementById('warning-modal'),
    confirmModal: document.getElementById('confirm-modal'),
    closeWarningBtn: document.getElementById('close-warning'),
    cancelSubmitBtn: document.getElementById('cancel-submit'),
    confirmSubmitBtn: document.getElementById('confirm-submit')
};

// --- Initialization ---
function initQuiz() {
    ui.totalQ.innerText = currentState.totalQuestions;

    // Simulate System Boot/Loading for Engagement
    setTimeout(() => {
        loadQuestion(currentState.currentQuestionIndex);

        // Event Listeners
        ui.nextBtn.addEventListener('click', handleNext);
        ui.submitBtn.addEventListener('click', () => showModal(ui.confirmModal));
        ui.confirmSubmitBtn.addEventListener('click', finishQuiz);
        ui.cancelSubmitBtn.addEventListener('click', () => hideModal(ui.confirmModal));
        ui.closeWarningBtn.addEventListener('click', () => hideModal(ui.warningModal));

        // Anti-Cheating
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('contextmenu', event => event.preventDefault()); // Disable Right Click
        document.addEventListener('keydown', event => {
            // Prevent F12, Ctrl+Shift+I (DevTools), Ctrl+C/V
            if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
                event.preventDefault();
            }
        });
    }, 2000); // 2 second "Boot sequence" delay
}

// --- Core Logic ---

function loadQuestion(index) {
    const qData = quizData[index];
    if (!qData) return;

    // Reset State for new question
    currentState.isLocked = false;
    ui.nextBtn.disabled = true;
    ui.footerMsg.style.opacity = '1';
    ui.footerMsg.innerText = "SELECT_OPTION_TO_LOCK_ANSWER";
    ui.questionText.innerHTML = qData.text; // Use innerHTML to preserve any formatting

    // Set timer based on round
    const round = qData.round - 1; // 0-indexed
    const timePerQ = ROUND_CONFIG[round].timePerQuestion;

    if (timePerQ > 0) {
        // Reset timer for this question
        clearInterval(currentState.timerInterval);
        currentState.timeLeft = timePerQ;
        startTimer();
    } else {
        // No timer for Round 3
        clearInterval(currentState.timerInterval);
        ui.timerDisplay.innerText = "∞";
        ui.timerBox.classList.remove('timer-urgent');
    }

    // Render Options
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
        btn.addEventListener('click', () => handleOptionClick(i, btn));
        ui.optionsContainer.appendChild(btn);
    });

    // Update Progress
    const displayNum = (index + 1).toString().padStart(2, '0');
    ui.currentQ.innerText = displayNum;
    const progressPercent = ((index) / currentState.totalQuestions) * 100;
    ui.progressBar.style.width = `${progressPercent}%`;
}

function handleOptionClick(selectedIndex, btnElement) {
    if (currentState.isLocked) return;

    // Lock-in Logic (Buzzer Style)
    currentState.isLocked = true;
    currentState.answers[currentState.currentQuestionIndex] = selectedIndex;

    // Visuals
    btnElement.classList.add('selected');

    // Disable other options
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(btn => {
        btn.disabled = true; // Lock all
        if (btn !== btnElement) {
            // style handled by :disabled css
        }
    });

    // Enable Navigation
    if (currentState.currentQuestionIndex < currentState.totalQuestions - 1) {
        ui.nextBtn.disabled = false;
        ui.footerMsg.innerText = "ANSWER_LOCKED >> PROCEED_TO_NEXT";
    } else {
        // Last Question
        ui.nextBtn.classList.add('hidden');
        ui.submitBtn.classList.remove('hidden');
        ui.footerMsg.innerText = "FINAL_ANSWER_LOCKED >> SUBMIT_QUIZ";
    }
}

function handleNext() {
    if (currentState.currentQuestionIndex < currentState.totalQuestions - 1) {
        currentState.currentQuestionIndex++;
        loadQuestion(currentState.currentQuestionIndex);
    }
}

// --- Timer Logic ---
function startTimer() {
    updateTimerDisplay();
    currentState.timerInterval = setInterval(() => {
        currentState.timeLeft--;
        updateTimerDisplay();

        if (currentState.timeLeft <= 0) {
            clearInterval(currentState.timerInterval);
            finishQuiz(true); // Auto-submit time up
        }
    }, 1000);
}

function updateTimerDisplay() {
    const m = Math.floor(currentState.timeLeft / 60);
    const s = currentState.timeLeft % 60;
    ui.timerDisplay.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    // Visual urgency (last 1 minute)
    if (currentState.timeLeft < 60) {
        ui.timerBox.classList.add('timer-urgent');
    }
}

// --- Anti-Cheating ---
function handleVisibilityChange() {
    if (document.hidden) {
        currentState.tabSwitchCount++;
        if (currentState.tabSwitchCount === 1) {
            showModal(ui.warningModal);
        } else if (currentState.tabSwitchCount >= 2) {
            finishQuiz(true); // Auto submit on second violation
        }
    }
}

// --- Submission ---
function showModal(modal) {
    modal.classList.remove('hidden');
}

function hideModal(modal) {
    modal.classList.add('hidden');
}

function finishQuiz(auto = false) {
    clearInterval(currentState.timerInterval);
    hideModal(ui.confirmModal);

    const reason = auto ? "Time up or Cheat detected." : "User submitted.";
    alert(`Quiz Submitted! \nReason: ${reason} \n(Backend integration would happen here)`);

    // Disable everything
    ui.nextBtn.disabled = true;
    ui.submitBtn.disabled = true;
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(btn => btn.disabled = true);
}

// Run
window.addEventListener('DOMContentLoaded', initQuiz);
