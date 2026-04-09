function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function fillPlaceholders(text, message, context) {
    const isOwner = message.author.id === context.OWNER_ID;

    return text
        .replace(/\{user\}/g, message.author.username)
        .replace(/\{mention\}/g, `<@${message.author.id}>`)
        .replace(/\{captain\}/g, isOwner ? 'Captain' : message.author.username)
        .replace(/\{bot\}/g, message.client.user.username);
}

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

    const rawReply = pickRandom(pool);
    return fillPlaceholders(rawReply, message, context);
}

module.exports = {
    getResponse
};
