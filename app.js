// DOM Elements
const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultsPage = document.getElementById('results-page');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const retryButton = document.getElementById('retry-button');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timerElement = document.getElementById('time-left');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const badgesList = document.getElementById('badges-list');
const leaderboardList = document.getElementById('leaderboard-list');

// Quiz Variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;
let quizData = [];

// Fetch Quiz Data from API or Local JSON
async function fetchQuizData() {
    try {
        const response = await fetch('quiz-data.json'); // Replace with your JSON file path or API endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
        }
        quizData = await response.json();
        startQuiz();
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        // Fallback to local quiz data
        quizData = [
            {
                question: "What is the capital of France?",
                options: ["Paris", "London", "Berlin", "Madrid"],
                correctAnswer: "Paris",
                difficulty: "easy",
                category: "Geography"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Saturn"],
                correctAnswer: "Mars",
                difficulty: "easy",
                category: "Science"
            }
        ];
        startQuiz();
    }
}

// Start the Quiz
function startQuiz() {
    homePage.style.display = 'none';
    quizPage.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    scoreElement.innerText = `Score: ${score}`;
    showQuestion();
    startTimer();
}

// Display Current Question
function showQuestion() {
    const question = quizData[currentQuestionIndex];
    questionElement.innerText = question.question;
    optionsElement.innerHTML = question.options
        .map(
            (option) =>
                `<button class="option" onclick="checkAnswer('${option}')">${option}</button>`
        )
        .join('');
    nextButton.style.display = 'none';
}

// Check User's Answer
function checkAnswer(selectedOption) {
    const question = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true; // Disable all options
        if (option.innerText === question.correctAnswer) {
            option.style.backgroundColor = '#28a745'; // Green for correct answer
        } else if (option.innerText === selectedOption) {
            option.style.backgroundColor = '#dc3545'; // Red for incorrect answer
        }
    });

    if (selectedOption === question.correctAnswer) {
        score += 10;
        scoreElement.innerText = `Score: ${score}`;
    }
    clearInterval(timer);
    nextButton.style.display = 'block';
}

// Move to Next Question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        timeLeft = 10;
        timerElement.innerText = timeLeft; // Reset timer display
        startTimer();
        showQuestion();
    } else {
        endQuiz();
    }
});

// Timer Functionality
function startTimer() {
    timerElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(null); // Auto-submit if time runs out
        }
    }, 1000);
}

// End the Quiz
function endQuiz() {
    clearInterval(timer);
    quizPage.style.display = 'none';
    resultsPage.style.display = 'block';
    finalScoreElement.innerText = score;
    awardBadges();
    updateLeaderboard();
}

// Award Badges Based on Score
function awardBadges() {
    badgesList.innerHTML = ''; // Clear previous badges
    if (score >= 50) {
        badgesList.innerHTML += `<li>🎖️ Quiz Master</li>`;
    }
    if (score >= 30) {
        badgesList.innerHTML += `<li>🏅 Pro Quizzer</li>`;
    }
    if (score >= 10) {
        badgesList.innerHTML += `<li>🥉 Beginner</li>`;
    }
}

// Update Leaderboard
function updateLeaderboard() {
    const playerName = prompt('Enter your name:'); // Get player name
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName || 'Player', score: score }); // Use 'Player' as default name
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score in descending order
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    leaderboardList.innerHTML = leaderboard
        .slice(0, 5) // Show top 5 players
        .map((entry, index) => `<li>${index + 1}. ${entry.name} - ${entry.score} points</li>`)
        .join('');
}

// Retry Quiz
retryButton.addEventListener('click', () => {
    resultsPage.style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    startQuiz();
});

// Initialize Quiz
startButton.addEventListener('click', fetchQuizData);