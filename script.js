const startButton = document.getElementById("start-button")
const nextButton = document.getElementById("next-button")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
var timer = document.getElementById("timer")
secondsLeft = 60

let quizQuestions, currentQuizQuestion

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000)
}

startButton.addEventListener("click", startGame)
startButton.addEventListener("click", setTime)
nextButton.addEventListener("click", () => {
    currentQuizQuestion++
    setNextQuestion()
})

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
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
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
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (quizQuestions.length > currentQuizQuestion + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    }   else {
        element.classList.add("wrong")
    }
}
    
function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
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
        question: "NUMBER 5?",
        answers: [
          {text: "var America = \"Red\", \"White\", \"Blue\"", correct: false},
          {text: "var America = [\"Red\", \"White\", \"Blue\"]", correct: true},
          {text: "var (America = Red, White, Blue)", correct: false},
          {text: "var America = (1:\"Red\", 2:\"White\", 3:\"Blue\")", correct: false},
        ]  
      },
]
