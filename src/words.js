export const WORDS = [
  "PLANT",
  "MOUSE",
  "STONE",
  "CLOUD",
  "GLASS",
  "SHINE",
  "SUGAR",
  "TRAIL",
  "HEART",
  "NIGHT",
  "FRUIT",
  "LOVER",
  "CRISP",
  "GRAPE",
];

export function getDailyWord() {
  const index =
    Math.floor((Date.now() - new Date("2024-01-01")) / (1000 * 60 * 60 * 24)) %
    WORDS.length;
  return WORDS[index];
}

export function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
