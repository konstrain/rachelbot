function getResponse(message, context, responses) {
    const mood = context.getMood();
    const isOwner = message.author.id === context.OWNER_ID;

    const moodSet = responses[mood];

    if (!moodSet) {
        return "Rachel has no response for this mood... 👀";
    }

    const pool = isOwner ? moodSet.owner : moodSet.user;

    if (!pool || pool.length === 0) {
        return "Rachel is... thinking.";
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

module.exports = {
    getResponse
};