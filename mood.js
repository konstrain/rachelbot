let currentMood = null;
let lastUpdated = 0;

const MOOD_DURATION = 3 * 60 * 1000; // 3 minutes

const moods = [
  'cheerful',
  'cheerful',
  'cheerful',
  'playful',
  'playful',
  'sarcastic',
  'sleepy'
];

function pickRandomMood() {
  return moods[Math.floor(Math.random() * moods.length)];
}

function getMood() {
  const now = Date.now();

  // if no mood yet OR expired → generate new
  if (!currentMood || (now - lastUpdated > MOOD_DURATION)) {
    currentMood = pickRandomMood();
    lastUpdated = now;

    console.log(`New mood: ${currentMood}`);
  }

  return currentMood;
}

module.exports = {
  getMood
};
