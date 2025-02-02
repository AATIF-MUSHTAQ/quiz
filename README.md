QuizMaster 🎮
A web-based quiz application with gamification features, dynamic questions, and a leaderboard.
![Screenshot_20250202_034414](https://github.com/user-attachments/assets/cb4b2c60-d8cc-4b89-89cb-72f21d78da17)

Features ✨
Dynamic Questions: Fetches quiz data from a JSON file or API.

Timer: 10-second countdown per question.

Gamification: Earn points, unlock badges (Quiz Master, Pro Quizzer, etc.).

Leaderboard: Tracks top 5 scores using localStorage.

Responsive Design: Works on mobile and desktop.

Answer Feedback: Highlights correct/incorrect answers.

Installation 🛠️
Clone the repository:

bash
Copy
git clone https://github.com/AATIF-MUSHTAQ/quiz
cd quizmaster  
Serve the application:

Use a simple HTTP server (e.g., http-server or Python’s http.server):

bash
Copy
npm install -g http-server  
http-server  
Open http://localhost:8080 in your browser.

Usage 🚀
Start the Quiz: Click "Start Quiz" on the home page.

Answer Questions: Select an option before the timer runs out.

Track Progress: See your score and time remaining in real-time.

View Results: After completing the quiz, check your badges and leaderboard rank.

Retry: Click "Retry Quiz" to play again.


Customization 🎨
Modify Questions
Edit quiz-data.json to add/update questions:

Adjust Styling
Edit styles.css to change colors, fonts, or layouts:

Update Gamification Logic
Modify app.js to:

Adjust scoring rules.

Add new badges.

Change the timer duration.

Technologies Used 💻
HTML5, CSS3, JavaScript (ES6+)

localStorage for leaderboard persistence

Fetch API for data loading


video: 
https://github.com/user-attachments/assets/e63ec44b-33e4-445a-bb95-4a81449eb971

