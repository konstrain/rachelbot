module.exports = {
    name: "love",
    description: "Find out who is my eternal lover!",
    execute: (message, args, channel, context) => {
        const { OWNER_ID } = context;

        if (message.author.id === OWNER_ID) {
            channel.send("Do you even need to ask? It's definitely you!");
        } else {
            channel.send("The one and only man I love... <@350550564527931392> My life, my love, my hubby.");
        }
    }
};