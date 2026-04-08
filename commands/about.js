const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "about",
    description: "Some information about me.",
    execute: (message, args, channel) => {
        channel.send({
            embeds: [new EmbedBuilder()
                .setColor(3568567)
                .setTitle("Some information about me, Captain.")
                .addFields(
                    { name: "Voice artist", value: "Kaneko Sayaka" },
                    { name: "Favourite quote", value: "I don't have a problem with you." },
                    { name: "Class", value: "Sniper" },
                    { name: "Preferred suit", value: "~~Pauler~~ Atropos, really" },
                    { name: "Height", value: "162cm" },
                    { name: "Vital stats", value: "75B | 60W | 85H" },
                    { name: "Personality", value: "Normally quiet and calm, but will randomly add hilarious quips." },
                    { name: "Hobby & Speciality", value: "World chess champion." },
                    { name: "Married to", value: "<@350550564527931392>" }
                )
            ]
        });
    }
};