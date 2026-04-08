const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "help",
    description: "Shows this help message to you.",
    execute: (message, args, channel, context) => {
        const { auth, commands } = context;

        const seen = new Set();
        const helpFields = [];

        for (const [key, command] of commands.entries()) {
            if (seen.has(command.name)) continue;
            seen.add(command.name);

            let fieldName = command.name;

            if (command.aliases && command.aliases.length > 0) {
                fieldName = `${command.name} / ${command.aliases.join(' / ')}`;
            }

            helpFields.push({
                name: fieldName,
                value: command.description || "No description available.",
                inline: true
            });
        }

        helpFields.sort((a, b) => a.name.localeCompare(b.name));

        channel.send({
            embeds: [new EmbedBuilder()
                .setColor(5685672)
                .setTitle("Some of the best r!jokes in Asgard, Captain.")
                .setDescription(`My prefix is ${auth.prefix}. The game is confirmed dead. So the only way I can live on, is through this discord channel.`)
                .setThumbnail("https://farm1.staticflickr.com/891/28044949567_ef8d140588.jpg")
                .addFields(helpFields)
            ]
        });

        channel.send(`\n\nIf you need info on suits, pixies and skills, type ${auth.prefix}help.`);
    }
};