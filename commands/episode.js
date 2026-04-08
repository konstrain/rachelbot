const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "episode",
    description: "How to clear my episodes.",
    execute: (message, args, channel) => {
        channel.send({
            embeds: [new EmbedBuilder()
                .setColor(5685672)
                .setTitle("How to clear my episodes")
                .setDescription(`Try to get perfect clear, Captain!
**Episode 1** - "Placate Rachel"
**Episode 2** - "No, She looks okay"
**Episode 3** - "I need to organize my thoughts" / "Be honest"
**Episode 4** - "We only have jokes to rely on!" / "It's my fault"
**Episode 9** - "Just give her a little hint" / "I don't know what to do!"`)
            ]
        });
    }
};