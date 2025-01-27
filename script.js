// JavaScript source code
// Configuración inicial
const apiKey = sk-VAOZ9zw_zxBP28FLXnGa-url-MdMRTe6BA7JaRS27ET3BlbkFJC05ND-dJ4SWtYBRvoO5wss_hQhIet1s2LZcBYXFycA; // Reemplaza con tu clave API de OpenAI
const generateQuizButton = document.getElementById("generate-quiz");
const quizContainer = document.getElementById("quiz-container");
const inputText = document.getElementById("input-text");
const submitQuizButton = document.getElementById("submit-quiz");
const resultSection = document.getElementById("result-section");
const resultText = document.getElementById("result");

// Evento para generar el quiz
generateQuizButton.addEventListener("click", async () => {
    const text = inputText.value.trim();
    if (!text) {
        alert("Por favor, escribe un tema o texto.");
        return;
    }

    // Llamada a la API de OpenAI para generar preguntas
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Genera un quiz de opción múltiple basado en el siguiente texto: ${text}. Incluye preguntas y 4 opciones (A, B, C, D) marcando la correcta.`,
            max_tokens: 300,
            temperature: 0.7
        })
    });

    const data = await response.json();
    const quizText = data.choices[0].text.trim();

    // Procesar el texto del quiz
    const questions = quizText.split("\n").filter(q => q);
    displayQuiz(questions);
});

// Función para mostrar el quiz
function displayQuiz(questions) {
    quizContainer.innerHTML = "";
    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("quiz-question");
        questionDiv.innerHTML = `
            <p><strong>${index + 1}. ${question}</strong></p>
            <label><input type="radio" name="question-${index}" value="A"> A</label>
            <label><input type="radio" name="question-${index}" value="B"> B</label>
            <label><input type="radio" name="question-${index}" value="C"> C</label>
            <label><input type="radio" name="question-${index}" value="D"> D</label>
        `;
        quizContainer.appendChild(questionDiv);
    });

    document.getElementById("quiz-section").style.display = "block";
    submitQuizButton.style.display = "block";
}

// Evento para enviar respuestas
submitQuizButton.addEventListener("click", () => {
    const answers = Array.from(document.querySelectorAll("input[type=radio]:checked"));
    if (answers.length < quizContainer.childElementCount) {
        alert("Responde todas las preguntas antes de enviar.");
        return;
    }

    // Mostrar puntaje (puedes mejorar esta parte para verificar respuestas correctas)
    resultSection.style.display = "block";
    resultText.textContent = `¡Completaste el quiz! Has respondido ${answers.length} preguntas.`;
});
