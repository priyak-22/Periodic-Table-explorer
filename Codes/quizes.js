// Sample quiz data
const quizData = {
    all: [
        { question: "Atomic number of Hydrogen?", options: ["1", "2", "3"], answer: "1" },
        { question: "Which is a noble gas?", options: ["He", "Li", "O"], answer: "He" }
    ],
    alkali: [
        { question: "Lightest alkali metal?", options: ["Li", "Na", "K"], answer: "Li" }
    ],
    noble: [
        { question: "Used in balloons?", options: ["He", "Ne", "Ar"], answer: "He" }
    ]
};

let currentCategory = "all";
let currentIndex = 0;

function loadCategory(category) {
    currentCategory = category;
    const container = document.getElementById("quiz-cards");
    container.innerHTML = "";

    const quizzes = quizData[category] || [];
    quizzes.forEach((q, index) => {
        const card = document.createElement("div");
        card.className = "quiz-card";
        card.innerHTML = `
            <h3>Question ${index + 1}</h3>
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

    const q = quizData[currentCategory][index];
    quizArea.innerHTML = `
        <p>${q.question}</p>
        ${q.options.map(opt => `<label><input type="radio" name="q0" value="${opt}"> ${opt}</label>`).join('')}
        <button onclick="checkAnswer()">Submit</button>
    `;
}

function checkAnswer() {
    const q = quizData[currentCategory][currentIndex];
    const selected = document.querySelector('input[name="q0"]:checked');
    if (!selected) { alert("Select an answer!"); return; }

    if (selected.value === q.answer) alert("Correct!");
    else alert(`Wrong! Correct answer: ${q.answer}`);
}

// Load default category
window.onload = () => loadCategory("all");
