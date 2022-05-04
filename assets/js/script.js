let countdown = 0;
let timer;
let score = 0;
let currentQuestion = -1;
let playername = document.getElementById("name");
let playerscores = "";

// Questions:

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

//Functions:
//Start and timer:

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

//Endgame:
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
<button onclick="submitScore()">Submit score!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//submit and store the data in scores.html

function submitPLayername(event) {
  event.preventDefault();

  var userInput = playername.value.trim();

  playerscore = quizContent + score;

  var ScoreBox = {
    name: playername,
    score: playerscore,
  };
  SaveData(ScoreBox);
  window.location.href = "Code-Quiz/assets/html/scores.html";
}

function SaveData(data) {
  let storage =
    JSON.parse(localStorage.getItem("Code-Quiz/assets/html/scores.html")) || [];
  storage.push(data);
  localStorage.setItem(
    "Code-Quiz/assets/html/scores.html",
    JSON.stringify(storage)
  );
}
