let countdown = 0;
let timer;
let score = 0;
let currentQuestion = -1;

let questions = [
  {
    title: "What does JS stand for?",
    choices: ["JavaScript", "JamSpread", "JohnSmith", "JasonStathoom"],
    answer: "JavaScript",
  },
  {
    title: "How do you enter a comment in JS?",
    choices: [
      "//This is a comment",
      "!!This is a comment",
      "??This is a comment",
      "none of the above",
    ],
    answer: "//This is a comment",
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: [
      "function = myFunction()",
      "function myFunction()",
      "function:myFunction()",
      "(myFunction) = function",
    ],
    answer: "function = myFunction()",
  },
  {
    title: "Which operator is used to assign a variable?",
    choices: ["*", "+", "=", "-"],
    answer: "=",
  },
  {
    title: "Arrays in Javascript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
];

function startButton() {
  countdown = 100;
  document.getElementById("countdown").innerHTML = countdown;

  timer = setInterval(function () {
    countdown--;
    document.getElementById("countdown").innerHTML = countdown;
    if (countdown <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  next();
}

function endGame() {
  clearInterval(timer);

  let quizContent =
    ` <h2>Game over!</h2>
<h3>You got a ` +
    score +
    ` /100!</h3>
<h3>That means you got ` +
    score / 20 +
    ` questions correct!</h3>
<input type="text" id="name" placeholder="Insert player name"> 
<button onclick="setScore()">Set score!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  getScore();
}

function getScore() {
  let quizContent =
    `
<h2>` +
    localStorage.getItem("highscoreName") +
    `'s highscore is:</h2>
<h1>` +
    localStorage.getItem("highscore") +
    `</h1>
<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;
  debugger;

  document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  countdown = 0;
  timer = null;

  document.getElementById("countdown").innerHTML = countdown;

  document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
  countdown -= 15;
  next();
}

function correct() {
  score += 20;
  next();
}

function next() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
    endGame();
    return;
  }

  let quizContent = "<h2>" + questions[currentQuestion].title + "</h2>";

  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    let btn = '<button onclick="[ANS]">[CHOICE]</button>';
    btn = btn.replace("[CHOICE]", questions[currentQuestion].choices[i]);

    if (
      questions[currentQuestion].choices[i] == questions[currentQuestion].answer
    ) {
      btn = btn.replace("[ANS]", "correct()");
    } else {
      btn = btn.replace("[ANS]", "incorrect()");
    }
    quizContent += btn;
  }

  document.getElementById("quizBody").innerHTML = quizContent;
}
