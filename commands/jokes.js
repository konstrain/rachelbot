module.exports = {
    name: "joke",
    aliases: ["jokes", "j"],
    description: "Hitting you with Admiral-Freyja-approved jokes.",
    execute: (message, args, channel, context) => {
        context.randomizeJoke(channel);
    }
};