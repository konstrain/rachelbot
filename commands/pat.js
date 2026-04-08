module.exports = {
    name: "pat",
    description: "Pat me gently... if you're allowed to.",
    execute: (message, args, channel, context) => {
        const { OWNER_ID, patLines, otherPatLines } = context;

        if (message.author.id === OWNER_ID) {
            channel.send(patLines[Math.floor(Math.random() * patLines.length)]);
        } else {
            channel.send(otherPatLines[Math.floor(Math.random() * otherPatLines.length)]);
        }
    }
};