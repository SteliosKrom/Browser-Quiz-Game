const questions = [
    {
        question: "Ποια είναι η πρωτεύουσα της Ελλάδας;",
        options: ["Αθήνα", "Θεσσαλονίκη", "Πάτρα", "Ηράκλειο"],
        answer: 0
    },
    {
        question: "Ποιος είναι ο μεγαλύτερος πλανήτης του ηλιακού μας συστήματος;",
        options: ["Γη", "Άρης", "Δίας", "Κρόνος"],
        answer: 2
    },
    {
        question: "Ποια είναι η μεγαλύτερη ήπειρος;",
        options: ["Ευρώπη", "Ασία", "Αφρική", "Αμερική"],
        answer: 1
    },
    {
        question: "Ποιο είναι το πιο γρήγορο ζώο στη στεριά;",
        options: ["Λιοντάρι", "Γατόπαρδος", "Άλογο", "Λύκος"],
        answer: 1
    },
    {
        question: "Πόσες ώρες έχει μία ημέρα;",
        options: ["10", "12", "24", "30"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("timer").textContent = `Χρόνος: ${timeLeft}`;
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const options = document.querySelectorAll(".option");
    options.forEach((button, index) => {
        button.textContent = questionData.options[index];
    });
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-question").style.display = "none";
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    document.getElementById("timer").textContent = `Χρόνος: ${timeLeft}`;
    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("feedback").textContent = "Χρόνος εξαντλήθηκε!";
        document.getElementById("next-question").style.display = "block";
    }
}

function selectAnswer(index) {
    clearInterval(timer);
    const questionData = questions[currentQuestionIndex];
    if (index === questionData.answer) {
        document.getElementById("feedback").textContent = "Σωστό!";
        score++;
    } else {
        document.getElementById("feedback").textContent = "Λάθος!";
    }
    document.getElementById("score").textContent = `Βαθμολογία: ${score}`;
    document.getElementById("next-question").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("question").textContent = "Τέλος παιχνιδιού!";
        document.getElementById("feedback").textContent = `Τελική Βαθμολογία: ${score} από ${questions.length}`;
        document.querySelector(".options").style.display = "none";
        document.getElementById("timer").style.display = "none";
        document.getElementById("next-question").style.display = "none";
    }
}

window.onload = loadQuestion;
