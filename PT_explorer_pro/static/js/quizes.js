// Sample quiz data with difficulty
const quizData = [
    { question: "Atomic number of Hydrogen?", options: ["1", "2", "3"], answer: "1", level: "easy" },
    { question: "Which is a noble gas?", options: ["He", "Li", "O"], answer: "He", level: "easy" },
    { question: "Lightest alkali metal?", options: ["Li", "Na", "K"], answer: "Li", level: "intermediate" },
    { question: "Used in balloons?", options: ["He", "Ne", "Ar"], answer: "He", level: "intermediate" },
    { question: "Electron configuration of Calcium?", options: ["[Ar] 4s2", "[Ne] 3s2", "[Kr] 5s2"], answer: "[Ar] 4s2", level: "hard" },
    { question: "Which element is liquid at room temperature?", options: ["Mercury", "Bromine", "Both"], answer: "Both", level: "hard" }
];

// Shuffle questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let currentIndex = 0;
let shuffledQuestions = shuffleArray([...quizData]);

function loadQuizCards() {
    const container = document.getElementById("quiz-cards");
    container.innerHTML = "";

    shuffledQuestions.forEach((q, index) => {
        const card = document.createElement("div");
        card.className = "quiz-card";
        card.innerHTML = `
            <h3>Question ${index + 1} (${q.level})</h3>
            <p>${q.question}</p>
            <button onclick="startQuiz(${index})">Start</button>
        `;
        container.appendChild(card);
    });

    document.getElementById("quiz-area").classList.add("hidden");
}

function startQuiz(index) {
    currentIndex = index;
    const quizArea = document.getElementById("quiz-area");
    quizArea.classList.remove("hidden");

    const q = shuffledQuestions[index];
    quizArea.innerHTML = `
        <p>${q.question} <strong>(${q.level})</strong></p>
        ${q.options.map(opt => `<label><input type="radio" name="q0" value="${opt}"> ${opt}</label>`).join('')}
        <button onclick="checkAnswer()">Submit</button>
    `;
}

function checkAnswer() {
    const q = shuffledQuestions[currentIndex];
    const selected = document.querySelector('input[name="q0"]:checked');
    if (!selected) { alert("Select an answer!"); return; }

    if (selected.value === q.answer) alert("Correct!");
    else alert(`Wrong! Correct answer: ${q.answer}`);
}

// Load quiz cards on page load
window.onload = () => loadQuizCards();
