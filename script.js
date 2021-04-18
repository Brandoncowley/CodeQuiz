const startButton = document.getElementById("start-button")
const nextButton = document.getElementById("next-button")
const finishButton = document.getElementById("finish-button")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const endScreenElement = document.getElementById("end-screen")
const submitButton = document.getElementById("submit-button")
const scoreboardElement = document.getElementById("scoreboard")
const resetButton = document.getElementById("reset-button")
const restartButton = document.getElementById("restart-button")
var leaderBoard = document.getElementById("scores")
var scores = []
const finalScore = document.getElementById("score")
var userName = document.getElementById("initials")
var timer = document.getElementById("timer")
secondsLeft = 60

let quizQuestions, currentQuizQuestion
timerInterval = null
//TIMER needs to be declared globally, cannot be called twice or live inside of the function for setTime
function setTime() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft
        if (secondsLeft == 0) {
            endGame()
            clearInterval(timerInterval);
            console.log("setinterval")
        }
    }, 1000)
}

startButton.addEventListener("click", startGame)
startButton.addEventListener("click", setTime)
nextButton.addEventListener("click", () => {
    currentQuizQuestion++
    setNextQuestion()
})

restartButton.addEventListener("click", startGame)
restartButton.addEventListener("click", setTime)


function startGame() {
    startButton.classList.add("hide")
    questionContainerElement.classList.remove("hide")
    quizQuestions = questions
    currentQuizQuestion = 0
    setNextQuestion()
    
}

function setNextQuestion() {
    resetState()
    showQuestion(quizQuestions[currentQuizQuestion])
}
    
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("button")
        //IF statement creates argument for timer to decrement if the wrong button is selected
        if (answer.correct) {
          button.addEventListener("click", function(e) {
            selectAnswer(e)
          })
       } else {
          button.addEventListener("click", function(e) {
            selectAnswer(e)
            secondsLeft -= 5;
          })
       }
        
       answerButtonsElement.appendChild(button)
    })
}
function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (quizQuestions.length > currentQuizQuestion + 1) {
        nextButton.classList.remove("hide")
    } else {
        finishButton.classList.remove("hide")
    }
}

finishButton.addEventListener("click", endGame)

function endGame() {
    finishButton.classList.add("hide")
    questionElement.classList.add("hide")
    answerButtonsElement.classList.add("hide")
    endScreenElement.classList.remove("hide")
    //stop timer, enter time value to scoreboard
    //initials need to go to scoreboard
        clearInterval(timerInterval);
    finalScore.innerText = (secondsLeft)
}

submitButton.addEventListener("click", submitScore)
function populateScoreboard() {
  leaderBoard.innerHTML = ""
  for (i = 0; i < scores.length; i++) {
    var players = document.createElement("li")
        players.innerText = scores[i][0]+", "+scores[i][1]
        leaderBoard.appendChild(players)
  }
}


function submitScore() {
    endScreenElement.classList.add("hide")
    submitButton.classList.add("hide")
    scoreboardElement.classList.remove("hide")
    scores.push([finalScore.innerHTML, userName.value])
    scores.sort(function(a, b) {
     return b[0] - a[0]
    })
    populateScoreboard()
}

restartButton.addEventListener("click", resetGame) 
  function resetGame() {
    startGame()
    setTime()
    secondsLeft = 60
  }





const questions = [
    {
      question: "What is the HTML tag used to link your JavaScript sheet?",
      answers: [
        {text: "<script>", correct: true},
        {text: "<scraped>", correct: false},
        {text: "<scrapped>", correct: false},
        {text: "<scooped>", correct: false},
      ]  
    },
    {
        question: "What is the correct way to start a FOR loop??",
        answers: [
          {text: "for i = 7; i++", correct: false},
          {text: "for (i = 0, i++)", correct: false},
          {text: "(for i < 7; ++1)", correct: false},
          {text: "for (i = 0; i < 7; i++)", correct: true},
        ]  
      },
      {
        question: "How do you add a comment in JavaScript?",
        answers: [
          {text: "<!--This is a comment-->", correct: false},
          {text: "/*This is a comment*/", correct: false},
          {text: "//This is a comment", correct: true},
          {text: "~This is a comment~", correct: false},
        ]  
      },
      {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
          {text: "var America = \"Red\", \"White\", \"Blue\"", correct: false},
          {text: "var America = [\"Red\", \"White\", \"Blue\"]", correct: true},
          {text: "var (America = Red, White, Blue)", correct: false},
          {text: "var America = (1:\"Red\", 2:\"White\", 3:\"Blue\")", correct: false},
        ]  
      },
      {
        question: "Which function of an Array object adds an element to the end of an array  returns the new length of the array?",
        answers: [
          {text: "pop()", correct: false},
          {text: "push()", correct: true},
          {text: "join()", correct: false},
          {text: "map()", correct: false},
        ]  
      },
]
