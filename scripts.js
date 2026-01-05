class Quiz {
    constructor() {
        this.questions = quizQuestions;
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.totalTime = 30 * 60; // 30 minutes in seconds
        this.timeLeft = this.totalTime;
        this.quizStarted = false;
        this.quizSubmitted = false;
        
        // Initialize
        this.init();
        this.setupEventListeners();
        this.setupAntiCheating();
    }

    init() {
        this.displayQuestion();
        this.updateQuestionCounter();
        this.createQuestionDots();
        this.startTimer();
        this.showInstructions();
    }

    setupEventListeners() {
        // Next button
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        // Previous button
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousQuestion();
        });

        // Submit button
        document.getElementById('submit-btn').addEventListener('click', () => {
            this.showConfirmationModal();
        });

        // Start quiz button
        document.getElementById('start-quiz').addEventListener('click', () => {
            this.hideInstructions();
            this.quizStarted = true;
        });

        // Confirmation modal buttons
        document.getElementById('cancel-submit').addEventListener('click', () => {
            this.hideConfirmationModal();
        });

        document.getElementById('confirm-submit').addEventListener('click', () => {
            this.submitQuiz();
        });

        // Question dot navigation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('question-dot')) {
                const questionIndex = parseInt(e.target.dataset.index);
                this.goToQuestion(questionIndex);
            }
        });
    }

    setupAntiCheating() {
        // Prevent copy/paste
        document.addEventListener('copy', (e) => {
            e.preventDefault();
            this.showWarning('Copying is disabled during the quiz!');
        });

        document.addEventListener('cut', (e) => {
            e.preventDefault();
            this.showWarning('Cutting is disabled during the quiz!');
        });

        document.addEventListener('paste', (e) => {
            e.preventDefault();
            this.showWarning('Pasting is disabled during the quiz!');
        });

        // Detect tab/window switch
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.quizStarted && !this.quizSubmitted) {
                this.showWarning('Tab switching detected! Automatic submission in 5 seconds...');
                setTimeout(() => {
                    if (document.hidden) {
                        this.submitQuiz();
                    }
                }, 5000);
            }
        });

        // Prevent context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showWarning('Right-click is disabled!');
        });

        // Prevent keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                this.showWarning('Developer tools are disabled!');
            }
        });
    }

    showWarning(message) {
        const banner = document.getElementById('warning-banner');
        const originalText = banner.querySelector('span').textContent;
        
        banner.querySelector('span').textContent = message;
        banner.style.background = 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)';
        
        setTimeout(() => {
            banner.querySelector('span').textContent = originalText;
            banner.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)';
        }, 3000);
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';

        const letters = ['A', 'B', 'C', 'D'];
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (this.userAnswers[this.currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }

            optionElement.innerHTML = `
                <div class="option-letter">${letters[index]}</div>
                <div class="option-text">${option}</div>
            `;

            optionElement.addEventListener('click', () => {
                this.selectOption(index);
            });

            optionsContainer.appendChild(optionElement);
        });

        this.updateNavigationButtons();
    }

    selectOption(optionIndex) {
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        
        // Update UI
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.classList.remove('selected');
            if (index === optionIndex) {
                option.classList.add('selected');
            }
        });

        // Update question dot
        this.updateQuestionDots();
        
        // Auto-save (in a real app, this would send to server)
        this.autoSave();
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.updateQuestionCounter();
            this.updateQuestionDots();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
            this.updateQuestionCounter();
            this.updateQuestionDots();
        }
    }

    goToQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentQuestionIndex = index;
            this.displayQuestion();
            this.updateQuestionCounter();
            this.updateQuestionDots();
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentQuestionIndex === 0;
        nextBtn.disabled = this.currentQuestionIndex === this.questions.length - 1;
    }

    updateQuestionCounter() {
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
    }

    createQuestionDots() {
        const dotsContainer = document.getElementById('question-dots');
        dotsContainer.innerHTML = '';

        this.questions.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'question-dot';
            dot.textContent = index + 1;
            dot.dataset.index = index;
            
            if (index === this.currentQuestionIndex) {
                dot.classList.add('active');
            }

            dotsContainer.appendChild(dot);
        });

        this.updateQuestionDots();
    }

    updateQuestionDots() {
        const dots = document.querySelectorAll('.question-dot');
        
        dots.forEach((dot, index) => {
            dot.classList.remove('active', 'answered');
            
            if (index === this.currentQuestionIndex) {
                dot.classList.add('active');
            }
            
            if (this.userAnswers[index] !== null) {
                dot.classList.add('answered');
            }
        });
    }

    startTimer() {
        const timerElement = document.getElementById('timer');
        const progressFill = document.getElementById('progress-fill');

        const timer = setInterval(() => {
            if (this.timeLeft <= 0 || this.quizSubmitted) {
                clearInterval(timer);
                if (!this.quizSubmitted) {
                    this.submitQuiz();
                }
                return;
            }

            this.timeLeft--;

            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Update progress bar
            const progress = (this.timeLeft / this.totalTime) * 100;
            progressFill.style.width = `${progress}%`;

            // Change color when time is running out
            if (this.timeLeft < 60) { // Less than 1 minute
                progressFill.style.background = 'linear-gradient(90deg, #ff416c, #ff4b2b)';
                timerElement.style.color = '#ff416c';
            } else if (this.timeLeft < 300) { // Less than 5 minutes
                progressFill.style.background = 'linear-gradient(90deg, #FFA500, #FFD700)';
            }

        }, 1000);
    }

    showInstructions() {
        document.getElementById('instructions-modal').style.display = 'flex';
    }

    hideInstructions() {
        document.getElementById('instructions-modal').style.display = 'none';
        this.quizStarted = true;
    }

    showConfirmationModal() {
        const answeredCount = this.userAnswers.filter(answer => answer !== null).length;
        document.getElementById('answered-count').textContent = answeredCount;
        document.getElementById('confirmation-modal').style.display = 'flex';
    }

    hideConfirmationModal() {
        document.getElementById('confirmation-modal').style.display = 'none';
    }

    autoSave() {
        // In a real application, this would save to localStorage or send to server
        console.log('Auto-saving answers...', this.userAnswers);
        
        // Show save indicator
        const saveIndicator = document.createElement('div');
        saveIndicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: fadeOut 2s forwards;
        `;
        saveIndicator.textContent = 'Answer saved ✓';
        document.body.appendChild(saveIndicator);
        
        setTimeout(() => {
            saveIndicator.remove();
        }, 2000);
    }

    calculateScore() {
        let score = 0;
        this.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correctAnswer) {
                score++;
            }
        });
        return score;
    }

    submitQuiz() {
        this.quizSubmitted = true;
        this.hideConfirmationModal();
        
        const score = this.calculateScore();
        const totalQuestions = this.questions.length;
        const percentage = (score / totalQuestions) * 100;
        
        // Show results
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        
        let resultMessage = '';
        let resultColor = '';
        
        if (percentage >= 80) {
            resultMessage = 'Excellent! 🎉';
            resultColor = '#4CAF50';
        } else if (percentage >= 60) {
            resultMessage = 'Good Job! 👍';
            resultColor = '#2196F3';
        } else if (percentage >= 40) {
            resultMessage = 'Keep Practicing! 💪';
            resultColor = '#FF9800';
        } else {
            resultMessage = 'Try Again! 📚';
            resultColor = '#f44336';
        }
        
        modal.innerHTML = `
            <div class="modal-content">
                <h2><i class="fas fa-trophy" style="color: ${resultColor}"></i> Quiz Completed!</h2>
                <div style="text-align: center; margin: 30px 0;">
                    <div style="font-size: 3rem; color: ${resultColor}; margin: 20px 0;">${resultMessage}</div>
                    <div style="font-size: 4rem; font-weight: bold; color: ${resultColor}">${score}/${totalQuestions}</div>
                    <div style="font-size: 1.2rem; color: #666; margin: 10px 0">${percentage.toFixed(1)}%</div>
                </div>
                
                <div style="margin: 20px 0;">
                    <h3>Review Answers:</h3>
                    <div id="review-answers" style="max-height: 300px; overflow-y: auto; margin-top: 15px;"></div>
                </div>
                
                <div class="modal-actions">
                    <button id="restart-quiz" class="btn btn-primary">
                        <i class="fas fa-redo"></i> Restart Quiz
                    </button>
                    <button id="close-quiz" class="btn btn-secondary">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show review of answers
        const reviewContainer = modal.querySelector('#review-answers');
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            const reviewItem = document.createElement('div');
            reviewItem.style.cssText = `
                padding: 15px;
                margin: 10px 0;
                border-radius: 8px;
                background: ${isCorrect ? '#e8f5e9' : '#ffebee'};
                border-left: 4px solid ${isCorrect ? '#4CAF50' : '#f44336'};
            `;
            
            reviewItem.innerHTML = `
                <div style="font-weight: bold; margin-bottom: 8px;">
                    Q${index + 1}: ${question.question}
                </div>
                <div style="margin-bottom: 5px;">
                    <strong>Your answer:</strong> 
                    <span style="color: ${isCorrect ? '#4CAF50' : '#f44336'}">
                        ${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                    </span>
                </div>
                ${!isCorrect ? `
                    <div style="margin-bottom: 5px;">
                        <strong>Correct answer:</strong> 
                        <span style="color: #4CAF50">${question.options[question.correctAnswer]}</span>
                    </div>
                ` : ''}
                <div style="font-size: 0.9rem; color: #666;">
                    ${question.explanation}
                </div>
            `;
            
            reviewContainer.appendChild(reviewItem);
        });
        
        // Add event listeners for result modal buttons
        modal.querySelector('#restart-quiz').addEventListener('click', () => {
            location.reload();
        });
        
        modal.querySelector('#close-quiz').addEventListener('click', () => {
            modal.remove();
        });
        
        // In a real app, you would send results to server here
        console.log('Quiz submitted with score:', score);
        console.log('User answers:', this.userAnswers);
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Quiz();
});