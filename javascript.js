const questions = [
    {
        q: "HTML stands for?",
        choices: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Tool Markup"],
        answer: 0
    },
    {
        q: "CSS is used for styling (True/False)",
        choices: ["True", "False"],
        answer: 0
    },
    {
        q: "Which creates a Flexbox layout?",
        choices: ["display:flex", "flex-mode:on", "layout:flex"],
        answer: 0
    },
    {
        q: "JavaScript runs in the browser. (True/False)",
        choices: ["True", "False"],
        answer: 0
    },
    {
        q: "DOM stands for?",
        choices: ["Document Object Model", "Data Object Method", "Digital Operations Map"],
        answer: 0
    }
];

let index = 0;
let score = 0;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const questionText = document.getElementById("questionText");
const choicesDiv = document.getElementById("choices");
const feedback = document.getElementById("feedback");

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("restartBtn").addEventListener("click", restartQuiz);

// Start Quiz
function startQuiz() {
    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    loadQuestion();
}

function loadQuestion() {
    feedback.innerHTML = "";
    choicesDiv.innerHTML = "";

    let q = questions[index];
    questionText.textContent = q.q;

    q.choices.forEach((choice, i) => {
        let btn = document.createElement("button");
        btn.textContent = choice;
        btn.className = "choiceBtn";
        btn.onclick = () => checkAnswer(i);
        choicesDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    let q = questions[index];

    const buttons = document.querySelectorAll(".choiceBtn");

    buttons.forEach((btn, i) => {
        if (i === q.answer) btn.classList.add("correct");
        else if (i === selected) btn.classList.add("wrong");
        btn.disabled = true;
    });

    if (selected === q.answer) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Wrong!";
    }
}

function nextQuestion() {
    if (index < questions.length - 1) {
        index++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    document.getElementById("finalScore").textContent = `Your Score: ${score} / ${questions.length}`;

    if (score === questions.length) {
        document.getElementById("finalMessage").textContent = "Excellent!";
    } else if (score >= questions.length / 2) {
        document.getElementById("finalMessage").textContent = "Good Job!";
    } else {
        document.getElementById("finalMessage").textContent = "Try Again!";
    }
}

function restartQuiz() {
    index = 0;
    score = 0;
    resultScreen.classList.add("hide");
    startScreen.classList.remove("hide");
}

