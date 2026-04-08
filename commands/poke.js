module.exports = {
    name: "poke",
    description: "Try it if you dare.",
    execute: (message, args, channel, context) => {
        const { OWNER_ID } = context;

        if (message.author.id === OWNER_ID) {
            channel.send("You can poke me anytime, darling Captain.");
        } else {
            channel.send("Ouch, stop that right now!");
        }
    }
};