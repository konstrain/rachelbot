const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const { parse } = require('csv-parse');

module.exports = {
    name: "b",
    description: "Vital stats for named pixies only. Example, r!b rachel",
    execute: (message, args, channel, context) => {
        const { inputFile2 } = context;

        let [pixie] = args;

        if (!pixie) {
            channel.send('Please provide a pixie name. Example: r!b rachel');
            return;
        }

        const pixieName = pixie.toUpperCase();

        const parser = parse({ delimiter: ',' }, (err, data) => {
            if (err) {
                console.error(err);
                channel.send("Error reading data.");
                return;
            }

            const row = data.find(line => line[0] === pixieName);

            if (!row) {
                channel.send(`No data found for ${pixie}`);
                return;
            }

            channel.send({
                embeds: [new EmbedBuilder()
                    .setColor(7154121)
                    .setTitle(`Vital stats for ${row[0]}`)
                    .setDescription("```Excited yet, Captain? :wink:```")
                    .setThumbnail(row[5] || null)
                    .addFields(
                        { name: "Height", value: row[1], inline: false },
                        { name: "Bust", value: `**${row[2]}** - B for Bust, not cup sizes`, inline: true },
                        { name: "Waist", value: row[3], inline: true },
                        { name: "Hips", value: row[4], inline: true }
                    )
                ]
            });
        });

        fs.createReadStream(inputFile2).pipe(parser);
    }
};