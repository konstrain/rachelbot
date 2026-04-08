const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "boobs",
    description: "Vital stats for all pixies on Asgard.",
    execute: (message, args, channel) => {
        channel.send({
            embeds: [new EmbedBuilder()
                .setColor(7154121)
                .setTitle("Vital stats for pixies on Asgard")
                .setDescription("```See who's big or otherwise. Excited yet, Captain?```")
                .setThumbnail("https://cdn.discordapp.com/emojis/449888370219286528.png?v=1")
                .addFields(
                    { name: "Leahs", value: "164CM | 87B / 61W / 87H", inline: true },
                    { name: "Puris", value: "163CM | 84B / 55W / 83H", inline: true },
                    { name: "Jeanie", value: "166CM | 86B / 61W / 90H", inline: true },
                    { name: "Labi", value: "173CM | 87B / 57W / 87H", inline: true },
                    { name: "Emily", value: "151CM | 73B / 51W / 78H", inline: true },
                    { name: "Erial", value: "164CM | 86B / 59W / 88H", inline: true },
                    { name: "Ophelia", value: "172CM | 95B / 64W / 93H", inline: true },
                    { name: "Naiz", value: "170CM | 89B / 62W / 89H", inline: true },
                    { name: "Rachel (that's me!)", value: "162CM | 75B / 60W / 85H", inline: true },
                    { name: "Florence", value: "169CM | 89B / 62W / 91H", inline: true },
                    { name: "Karu", value: "147CM | 73B / 53W / 78H", inline: true },
                    { name: "Kana", value: "171CM | 90B / 63W / 91H", inline: true },
                    { name: "Lacis", value: "165CM | 86B / 60W / 88H", inline: true },
                    { name: "Lita", value: "148CM | 79B / 56W / 79H", inline: true },
                    { name: "Maiyo", value: "172CM | 98B / 64W / 94H", inline: true },
                    { name: "Yulia", value: "150CM | 74B / 51W / 78H", inline: true },
                    { name: "Madi", value: "169CM | 87B / 62W / 92H", inline: true }
                )
            ]
        });

        channel.send({
            embeds: [new EmbedBuilder()
                .setColor(7154121)
                .addFields(
                    { name: "Devi", value: "178CM | 95B / 62W / 90H", inline: true },
                    { name: "Cubi", value: "150CM | 74B / 49W / 80H", inline: true },
                    { name: "Archi", value: "167CM | 81B / 61W / 85H", inline: true },
                    { name: "April", value: "154CM | 74B / 55W / 79H", inline: true },
                    { name: "Anna", value: "171CM | 87B / 62W / 90H", inline: true },
                    { name: "Irene", value: "175CM | 101B / 66W / 98H", inline: true },
                    { name: "Eres", value: "165CM | 88B / 59W / 85H", inline: true },
                    { name: "Rody", value: "156CM | 75B / 54W / 80H", inline: true },
                    { name: "Madeleine", value: "165CM | 80B / 60W / 85H", inline: true },
                    { name: "Croia", value: "173CM | 96B / 65W / 95H", inline: true },
                    { name: "Bri", value: "162CM | 77B / 58W / 79H", inline: true },
                    { name: "Noel", value: "165CM | 89B / 59W / 83H", inline: true },
                    { name: "Lucy", value: "161CM | 77B / 56W / 83H", inline: true },
                    { name: "Rocinate", value: "174CM | 89B / 61W / 90H", inline: true },
                    { name: "Rylah", value: "159CM | 82B / 55W / 83H", inline: true },
                    { name: "Amy", value: "167CM | 86B / 61W / 90H", inline: true },
                    { name: "Miku", value: "158CM | ??B / ??W / ??H", inline: true }
                )
            ]
        });
    }
};