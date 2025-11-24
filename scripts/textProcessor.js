// Extracts keywords based on frequency and difficulty

export function extractKeywords(text, difficulty) {
  const words = text
    .replace(/[^\w\s]/g, '')
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 3);

  // Basic frequency count
  const freq = {};
  words.forEach(w => (freq[w] = (freq[w] || 0) + 1));

  // Sort by frequency
  const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);

  // Adjust by difficulty
  let count = 5;
  if (difficulty === 'intermediate') count = 8;
  if (difficulty === 'advanced') count = 12;

  return sorted.slice(0, count);
}
