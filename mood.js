const moods = [
  'cheerful',
  'cheerful',
  'cheerful',
  'playful',
  'playful',
  'sarcastic',
  'sleepy'
];

function getMood() {
  const randomIndex = Math.floor(Math.random() * moods.length);
  return moods[randomIndex];
}

module.exports = {
  getMood
};