// Creates quiz objects from keywords
export function generateQuiz(keywords) {
  const quizzes = [];

  keywords.forEach((word, i) => {
    const type = i % 2 === 0 ? 'fill' : 'translation';
    if (type === 'fill') {
      quizzes.push({
        type: 'fill',
        question: `Fill in the missing word: "____" (${word.length} letters)`,
        answer: word
      });
    } else {
      quizzes.push({
        type: 'translation',
        question: `Translate the word "${word}" to Armenian`,
        answer: '(translation)'
      });
    }
  });

  return quizzes;
}
