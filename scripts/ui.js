// Handles rendering quiz cards and checking answers

export function renderQuiz(container, quiz) {
  container.innerHTML = '';

  quiz.forEach((q, index) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${q.question}</p>
      <input type="text" id="ans-${index}" placeholder="Your answer">
      <p id="feedback-${index}" class="feedback"></p>
    `;
    container.appendChild(card);
  });

  document.getElementById('btn-check-answers').onclick = () => {
    let score = 0;
    quiz.forEach((q, i) => {
      const input = document.getElementById(`ans-${i}`).value.trim().toLowerCase();
      const feedback = document.getElementById(`feedback-${i}`);
      if (input === q.answer.toLowerCase()) {
        feedback.textContent = '✔ Correct';
        feedback.className = 'correct';
        score++;
      } else {
        feedback.textContent = `✘ Correct answer: ${q.answer}`;
        feedback.className = 'incorrect';
      }
    });
    const percentage = Math.round((score / quiz.length) * 100);
    document.getElementById('final-score').textContent = percentage;
    document.getElementById('results-section').classList.add('active');
    document.getElementById('quiz-section').classList.remove('active');
  };
}
