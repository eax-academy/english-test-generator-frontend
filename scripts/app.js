// Handles navigation and test generation triggers
import { extractKeywords } from './textProcessor.js';
import { generateQuiz } from './quizGenerator.js';
import { renderQuiz } from './ui.js';

const views = document.querySelectorAll('.view');

function showView(id) {
  views.forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('btn-generate-test');
  const loader = document.getElementById('loader');
  const quizContainer = document.getElementById('quiz-container');

  generateBtn.addEventListener('click', async () => {
    const text = document.getElementById('text-input').value.trim();
    const difficulty = document.getElementById('difficulty').value;

    if (!text) return alert('Please paste some text first.');

    loader.classList.remove('hidden');
    const keywords = extractKeywords(text, difficulty);
    const quiz = generateQuiz(keywords);
    loader.classList.add('hidden');

    quizContainer.innerHTML = '';
    renderQuiz(quizContainer, quiz);
    showView('quiz-section');
  });

  document.getElementById('btn-restart').addEventListener('click', () => {
    showView('home-section');
  });
});
