var containerQuestionEl = document.getElementById("questioncontainer");
var containerRulesEl = document.getElementById("rulescontainer");
var containerEndEl = document.getElementById("endcontainer");
var leaderboardEl = document.getElementById("leaderboard");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("highscorecontainer");
var ViewHighScoreEl = document.getElementById("viewhighscores");
var listHighScoreEl = document.getElementById("highscore-list");
var correctEl = document.getElementById("correct");
var incorrectEl = document.getElementById("incorrect");
//buttons
var btnRulesEl = document.querySelector("#startgame");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-highscores");
//questions/answers element
var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answerbuttons");
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var end;
timerEl.innerText = 0;

//High Score Array
var HighScores = [];

//assign array details for questions
var arrayShuffledQuestions;
var QuestionIndex = 0;

// The array of questions for our quiz game.
var questions = [
  {
    q: "What does JS stand for?.",
    a: "4. JavaScript",
    choices: [
      { choice: "1. JamSpread" },
      { choice: "2. JohnSmith" },
      { choice: "3. JasonStathoom" },
      { choice: "4. JavaScript" },
    ],
  },
  {
    q: "Inside which HTML element do we put the javascript?",
    a: "3. <script>",
    choices: [
      { choice: "1. <h1>" },
      { choice: "2. <js>" },
      { choice: "3. <script>" },
      { choice: "4. <head>" },
    ],
  },
  {
    q: "How do you create a function in JavaScript?",
    a: "1. function = myFunction()",
    choices: [
      { choice: "1. function = myFunction()" },
      { choice: "2. function myFunction()" },
      { choice: "3. function:myFunction()" },
      { choice: "4. all of the above" },
    ],
  },
  {
    q: "What syntax would call a function?",
    a: "4. function()",
    choices: [
      { choice: "1. var function" },
      { choice: "2. function" },
      { choice: "3. call function" },
      { choice: "4. function()" },
    ],
  },
  {
    q: "Which operator is used to assign a variable?",
    a: "1. =",
    choices: [
      { choice: "1. =" },
      { choice: "2. +" },
      { choice: "3. -" },
      { choice: "4. /" },
    ],
  },
  {
    q: "What does DOM stand for?",
    a: "2. Document Object Model",
    choices: [
      { choice: "1. Do Overnight Modules" },
      { choice: "2. Document Object Model" },
      { choice: "3. Divas Obviously Model" },
      { choice: "4. Do Oo Mo" },
    ],
  },
  {
    q: "Arrays in Javascript can be used to store ____.",
    a: "4. all of the above",
    choices: [
      { choice: "1. numbers and strings" },
      { choice: "2. other arrays" },
      { choice: "3. booleans" },
      { choice: "4. all of the above" },
    ],
  },
];

//if go back button is hit on high score page
var renderStartPage = function () {
  containerHighScoresEl.classList.add("hide");
  containerHighScoresEl.classList.remove("show");
  containerRulesEl.classList.remove("hide");
  containerRulesEl.classList.add("show");
  leaderboardEl.removeChild(leaderboardEl.lastChild);
  QuestionIndex = 0;
  end = "";
  timerEl.textContent = 0;
  score = 0;

  if ((correctEl.className = "show")) {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
  }
  if ((incorrectEl.className = "show")) {
    incorrectEl.classList.remove("show");
    incorrectEl.classList.add("hide");
  }
};

//every second, check if game-over is true, or if there is time left. Start time at 30.
var setTime = function () {
  timeleft = 30;

  var timercheck = setInterval(function () {
    timerEl.innerText = timeleft;
    timeleft--;

    if (end) {
      clearInterval(timercheck);
    }

    if (timeleft < 0) {
      showScore();
      timerEl.innerText = 0;
      clearInterval(timercheck);
    }
  }, 1000);
};

var startGame = function () {
  //add classes to show/hide start and quiz screen
  containerRulesEl.classList.add("hide");
  containerRulesEl.classList.remove("show");
  containerQuestionEl.classList.remove("hide");
  containerQuestionEl.classList.add("show");
  //Shuffle the questions so they show in random order
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5);
  setTime();
  setQuestion();
};

//set next question for quiz
var setQuestion = function () {
  resetAnswers();
  displayQuestion(arrayShuffledQuestions[QuestionIndex]);
};

//remove answer buttons
var resetAnswers = function () {
  while (answerbuttonsEl.firstChild) {
    answerbuttonsEl.removeChild(answerbuttonsEl.firstChild);
  }
};

//display question information (including answer buttons)
var displayQuestion = function (index) {
  questionEl.innerText = index.q;
  for (var i = 0; i < index.choices.length; i++) {
    var answerbutton = document.createElement("button");
    answerbutton.innerText = index.choices[i].choice;
    answerbutton.classList.add("btn");
    answerbutton.classList.add("answerbtn");
    answerbutton.addEventListener("click", answerCheck);
    answerbuttonsEl.appendChild(answerbutton);
  }
};
//display correct! on screen
var answerCorrect = function () {
  if ((correctEl.className = "hide")) {
    correctEl.classList.remove("hide");
    correctEl.classList.add("banner");
    incorrectEl.classList.remove("banner");
    incorrectEl.classList.add("hide");
  }
};
//display incorrect! on screen
var answerincorrect = function () {
  if ((incorrectEl.className = "hide")) {
    incorrectEl.classList.remove("hide");
    incorrectEl.classList.add("banner");
    correctEl.classList.remove("banner");
    correctEl.classList.add("hide");
  }
};

//check if answer is correct
var answerCheck = function (event) {
  var selectedanswer = event.target;
  if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
    answerCorrect();
    score = score + 10;
  } else {
    answerincorrect();
    score = score - 1;
    timeleft = timeleft - 5;
  }

  //go to next question, check if there is more questions
  QuestionIndex++;
  if (arrayShuffledQuestions.length > QuestionIndex + 1) {
    setQuestion();
  } else {
    end = "true";
    showScore();
  }
};

//Display total score screen at end of game
var showScore = function () {
  containerQuestionEl.classList.add("hide");
  containerEndEl.classList.remove("hide");
  containerEndEl.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = "Your final score is " + score + "!";
  leaderboardEl.appendChild(scoreDisplay);
};

//create high score values
var createHighScore = function (event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

  formInitials.reset();

  var HighScore = {
    initials: initials,
    score: score,
  };

  //push and sort scores
  HighScores.push(HighScore);
  HighScores.sort((a, b) => {
    return b.score - a.score;
  });

  //clear visibile list to resort
  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }
  //create elements in order of high scores
  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "highscore";
    highscoreEl.innerHTML =
      HighScores[i].initials + " - " + HighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);
  }

  saveHighScore();
  displayHighScores();
};
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores));
};

//load values/ called on page load
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores");
  if (!LoadedHighScores) {
    return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => {
    return b.score - a.score;
  });

  for (var i = 0; i < LoadedHighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "highscore";
    highscoreEl.innerText =
      LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
    listHighScoreEl.appendChild(highscoreEl);

    HighScores.push(LoadedHighScores[i]);
  }
};

//display high score screen from link or when intiials entered
var displayHighScores = function () {
  containerHighScoresEl.classList.remove("hide");
  containerHighScoresEl.classList.add("show");
  end = "true";

  if ((containerEndEl.className = "show")) {
    containerEndEl.classList.remove("show");
    containerEndEl.classList.add("hide");
  }
  if ((containerRulesEl.className = "show")) {
    containerRulesEl.classList.remove("show");
    containerRulesEl.classList.add("hide");
  }

  if ((containerQuestionEl.className = "show")) {
    containerQuestionEl.classList.remove("show");
    containerQuestionEl.classList.add("hide");
  }

  if ((correctEl.className = "show")) {
    correctEl.classList.remove("show");
    correctEl.classList.add("hide");
  }

  if ((incorrectEl.className = "show")) {
    incorrectEl.classList.remove("show");
    incorrectEl.classList.add("hide");
  }
};

//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild);
  }

  localStorage.clear(HighScores);
};

loadHighScore();

//on start click, start game
btnRulesEl.addEventListener("click", startGame);
//on submit button -- enter or click
formInitials.addEventListener("submit", createHighScore);
//when view highscores is clicked
ViewHighScoreEl.addEventListener("click", displayHighScores);
//Go back button
btnGoBackEl.addEventListener("click", renderStartPage);
//clear scores button
btnClearScoresEl.addEventListener("click", clearScores);
