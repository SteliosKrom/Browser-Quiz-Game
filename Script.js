const questions = [
    {
        question: "1. Ποια είναι η πρωτεύουσα της Ελλάδας;",
        options: ["Αθήνα", "Θεσσαλονίκη", "Πάτρα", "Ηράκλειο"],
        answer: 0
    },
    {
        question: "2. Ποιος είναι ο μεγαλύτερος πλανήτης του ηλιακού μας συστήματος;",
        options: ["Γη", "Άρης", "Δίας", "Κρόνος"],
        answer: 2
    },
    {
        question: "3. Ποια είναι η μεγαλύτερη ήπειρος;",
        options: ["Ευρώπη", "Ασία", "Αφρική", "Αμερική"],
        answer: 1
    },
    {
        question: "4. Ποιο είναι το πιο γρήγορο ζώο στη στεριά;",
        options: ["Λιοντάρι", "Γατόπαρδος", "Άλογο", "Λύκος"],
        answer: 1
    },
    {
        question: "5. Πόσες ώρες έχει μία ημέρα;",
        options: ["10", "12", "24", "30"],
        answer: 2
    },
    {
        question: "6. Πότε έγινε η Άλωση της Κωνσταντινούπολης;",
        options: ["1430", "1453", "1421", "1443"],
        answer: 1
    },
    {
        question: "7. Ποιός δημιούργησε την Γλώσσα Προγραμματισμού C;",
        options: ["Brian Kernighan", "Dennis Ritchie", "Bjarne Stroustrup", "Ken Thompson"],
        answer: 1
    },
    {
        question: "8. Ποια γλώσσα προγραμματισμού χρησιμοποιήθηκε για τη δημιουργία του πρώτου ιστότοπου;",
        options: ["HTML", "C++", "Java", "Python"],
        answer: 0
    },
    {
        question: "9. Πότε έγινε η ιστορική Μάχη των Θερμοπυλών, όπου ο Λεωνίδας και οι 300 Σπαρτιάτες αντιμετώπισαν τον περσικό στρατό;",
        options: ["480 π.Χ", "500 π.Χ", "400 π.Χ", "300 π.Χ"],
        answer: 0
    },
    {
        question: "10. Ποιο από τα παρακάτω είναι το χημικό σύμβολο του νερού;",
        options: ["H₂O", "CO₂", "NaCl", "O₂"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function startQuiz() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    score = 0; // Επαναφορά βαθμολογίας στην αρχή
    document.getElementById("score").textContent = `Βαθμολογία: ${score}`;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("timer").textContent = `Χρόνος: ${timeLeft}`;
    document.getElementById("timer").style.color = "black"; // Επαναφορά χρώματος του χρονόμετρου
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const options = document.querySelectorAll(".option");
    options.forEach((button, index) => {
        button.textContent = questionData.options[index];
        button.disabled = false; // Ενεργοποίηση κουμπιών
    });
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-question").style.display = "none";
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Χρόνος: ${timeLeft}`;

    if (timeLeft <= 3) {
        timerElement.style.color = "red"; // Κόκκινο χρώμα όταν ο χρόνος είναι χαμηλός
    } else {
        timerElement.style.color = "black";
    }

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("feedback").textContent = "Χρόνος εξαντλήθηκε!";
        const options = document.querySelectorAll(".option");
        options.forEach((button) => (button.disabled = true)); // Απενεργοποίηση των κουμπιών
        document.getElementById("next-question").style.display = "block";
    }
}

function selectAnswer(index) {
    const options = document.querySelectorAll(".option");
    options.forEach((button) => (button.disabled = true)); // Απενεργοποίηση όλων των επιλογών μετά την απάντηση

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
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("final-score").textContent = `Τελική Βαθμολογία: ${score} από ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score").textContent = `Βαθμολογία: ${score}`;
    document.getElementById("end-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    loadQuestion();
}

window.onload = () => {
    document.getElementById("score").textContent = `Βαθμολογία: ${score}`;
};
