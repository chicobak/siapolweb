document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación real
    window.location.href = 'simulador.html';
});

  
  //codigo par ala pagina simulador
  const TOTAL_QUESTIONS = 5000;
const QUESTIONS_TO_LOAD = 100;
let userAnswers = new Array(QUESTIONS_TO_LOAD).fill(null);
let selectedQuestions = [];

// Generar preguntas de ejemplo (simulación de base de datos)
function generateQuestions() {
  return Array.from({length: TOTAL_QUESTIONS}, (_, i) => ({
    id: i + 1,
    text: `Pregunta ${i + 1}: ¿Cuál es la respuesta correcta?`,
    alternatives: ['A', 'B', 'C', 'D', 'E'].map(l => `Alternativa ${l}`),
    correct: Math.floor(Math.random() * 5)
  }));
}

// Seleccionar preguntas aleatorias
function selectRandomQuestions(questions) {
  const selected = new Set();
  while(selected.size < QUESTIONS_TO_LOAD) {
    selected.add(questions[Math.floor(Math.random() * TOTAL_QUESTIONS)]);
  }
  return Array.from(selected);
}

// Mostrar pregunta
function showQuestion(index) {
  const question = selectedQuestions[index];
  document.getElementById('question-number').textContent = `Pregunta ${index + 1}`;
  document.getElementById('question-text').textContent = question.text;
  
  const alternativesDiv = document.getElementById('alternatives');
  alternativesDiv.innerHTML = '';
  
  question.alternatives.forEach((alt, i) => {
    const div = document.createElement('div');
    div.className = 'alternative';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = userAnswers[index]?.includes(i) || false;
    checkbox.addEventListener('change', () => {
      // Solo una alternativa puede ser seleccionada
      userAnswers[index] = [i];
      showQuestion(index); // Refresca para desmarcar otros checkboxes
    });
    
    const label = document.createElement('label');
    label.textContent = ' ' + alt;
    label.prepend(checkbox);
    
    div.appendChild(label);
    alternativesDiv.appendChild(div);
  });
}

// Crear lista de preguntas
function createQuestionsList() {
  const list = document.getElementById('questions-list');
  list.innerHTML = '';
  selectedQuestions.forEach((_, i) => {
    const item = document.createElement('div');
    item.className = 'question-item';
    item.textContent = i + 1;
    item.addEventListener('click', () => showQuestion(i));
    list.appendChild(item);
  });
}

// Calcular resultados
function calculateResults() {
  const correctAnswers = selectedQuestions.map((q, i) => 
    userAnswers[i]?.includes(q.correct) ? 1 : 0
  ).reduce((a, b) => a + b, 0);
  
  return {
    correct: correctAnswers,
    total: QUESTIONS_TO_LOAD
  };
}

// Inicializar
window.onload = () => {
  selectedQuestions = selectRandomQuestions(generateQuestions());
  createQuestionsList();
  showQuestion(0);
  
  document.getElementById('finish-btn').addEventListener('click', () => {
    const results = calculateResults();
    alert(`Respuestas correctas: ${results.correct} de ${results.total}`);
  });
};
