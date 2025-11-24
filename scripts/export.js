// Handles exporting quiz data

export function exportAsJSON(quiz) {
  const blob = new Blob([JSON.stringify(quiz, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quiz.json';
  a.click();
}

export function exportAsPDF() {
  alert('PDF export coming soon!');
}
