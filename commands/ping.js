module.exports = {
    name: "ping",
    description: "Checks if I'm alive or not.",
    execute: (message, args, channel) => {
        channel.send("Don't ping me, captain. Don't r!poke me too... :flushed:");
    }
};