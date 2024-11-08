const questions = [
    {
        question: "Ποιος ειναι ο θεος του πολεμου στην Ελληνικη Μυθοδολογια;",
        options: ["Δίας", "Άρης", "Ήφαιστος", "Ερμής"],
        answer: "Άρης"
    },
    {
        question: "Ποιά χώρα έχει τον περισσότερο πληθυσμό στον κόσμο;",
        options: ["Ρωσία", "Αμερική", "Ινδία", "Κίνα"],
        answer: "Ινδία"
    },
    {
        question: "Πότε ξεκίνησε ο Α'παγκόσμιος πόλεμος;",
        options: ["1912", "1914", "1910", "1918"],
        answer: "1914"
    },
    {
        question: "Ποιά δημοφιλής ξένη συγγραφέας έγραψε αστυνομική λογοτεχνία;",
        options: ["Αγάθα Κρίστι", "Τζ.Κ.Ρόουλινγκ", "Στέφεν Κίνγκ", "Τζέιν Όστιν"],
        answer: "Αγάθα Κρίστι"
    },
    {
        question: "Ποιό είναι το πιο δημοφιλές λειτουργικό σύστημα στον κόσμο;",
        options: ["macOS", "Windows", "Linux", "ChromeOS"],
        answer: "Windows"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = question.question;
    
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Καθαρισμός παλαιών επιλογών

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = function() { checkAnswer(option); };
        optionsContainer.appendChild(button);
    });

    document.getElementById("score-display").innerText = `Βαθμολογία: ${score}`;
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    // Απενεργοποίηση των κουμπιών μετά την επιλογή
    const buttons = document.querySelectorAll("#options-container button");
    buttons.forEach(button => button.disabled = true);

    setTimeout(nextQuestion, 1000); // Αναμονή 1 δευτερολέπτου πριν την επόμενη ερώτηση
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert(`Τέλος του παιχνιδιού! Η τελική σας βαθμολογία είναι: ${score}`);
        // Επαναφορά για νέο παιχνίδι
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }
}

loadQuestion();