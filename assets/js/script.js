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
    title: "Arrays in Javascript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title: "Which operator is used to assign a variable?",
    choices: ["*", "+", "=", "-"],
    answer: "=",
  },
];
