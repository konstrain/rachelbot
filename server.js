const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const inputFile = 'expCalc.csv';
const inputFile2 = 'vitalStats.csv';
console.log("Processing CSV file");

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

const OWNER_ID = '350550564527931392';

const Discord = require('discord.js');
const { GatewayIntentBits, EmbedBuilder } = Discord;
const auth = require('./auth.json');

const bot = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

bot.on('clientReady', () => {
    bot.user.setActivity(`with @konstrain#8200 | ${auth.prefix}help | Here?`);
    console.log('Connected yo! Can you see me!? ');
});

bot.on('error', console.error);

// ------------------- COMMAND LOADER -------------------

const commands = new Map();
const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        commands.set(command.name, command);

        if (command.aliases) {
            for (const alias of command.aliases) {
                commands.set(alias, command);
            }
        }
    }
}

// ------------------- RANDOM JOKE -------------------

const randomizeJoke = (channel) => {
    try {
        const options = {
            hostname: 'icanhazdadjoke.com',
            path: '/',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'User-Agent': 'racheljokes-discord-bot'
            }
        };

        const req = https.request(options, res => {
            let body = '';
            res.setEncoding('utf8');

            res.on('data', chunk => body += chunk);

            res.on('end', () => {
                try {
                    const data = JSON.parse(body);

                    if (!data || !data.joke) {
                        channel.send("Hmm... I couldn't find a joke 😅");
                        return;
                    }

                    const embed = new EmbedBuilder()
                        .setColor(3447003)
                        .setTitle('Are you ready, Captain?')
                        .setDescription(data.joke);

                    channel.send({ embeds: [embed] });

                } catch (err) {
                    console.error('Joke parse error:', err);
                    console.error('Raw response:', body);
                    channel.send('Sorry Captain, I could not read the joke response.');
                }
            });
        });

        req.on('error', (e) => {
            console.error('Joke request error:', e);
            channel.send('Sorry Captain, I ran into an error getting a joke.');
        });

        req.end();
    } catch (err) {
        console.error('randomizeJoke error:', err);
    }
};

const patLines = [
    "Mmm... that's a gentle touch, Captain.",
    "Rachel closes her eyes for a moment. 'You may continue.'",
    "A pat on the head? ...I'll allow it, Captain.",
    "Rachel leans into your hand slightly. 'Don't stop just yet.'",
    "Hehe... you're oddly affectionate today, Captain."
];

const otherPatLines = [
    "Rachel steps back. 'Hands off.'",
    "She brushes your hand away. 'Don't get too familiar.'",
    "Rachel gives you a cold stare. 'Only Captain gets to do that.'",
    "She stiffens. '...I'd rather you didn't.'",
    "Rachel quietly moves out of reach."
];

// ------------------- BOT LOGIC -------------------

bot.on('messageCreate', async message => {

    if (message.author.bot) return;

    if (message.content.startsWith(".say")) {
        const saymsg = message.content.replace(".say", "").trim();
        if (saymsg.length > 0) {
            await message.channel.send(saymsg);
        }
        try {
            await message.delete();
        } catch (e) {
            console.error(e);
        }
        return;
    }

    if (!message.content.toLowerCase().startsWith(auth.prefix.toLowerCase())) return;

    const text = message.content;
    const channel = message.channel;

    const args = text.slice(auth.prefix.length).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();

    const context = {
        OWNER_ID,
        patLines,
        otherPatLines,
        randomizeJoke
    };

    const modularCommand = commands.get(cmd);
    if (modularCommand) {
        return modularCommand.execute(message, args, channel, context);
    }

    switch (cmd) {
        case 'help':
            channel.send({
                embeds: [new EmbedBuilder()
                    .setColor(5685672)
                    .setTitle("Some of the best r!jokes in Asgard, Captain.")
                    .setDescription("My prefix is r!. The game is confirmed dead. So the only way I can live on, is through this discord channel.")
                    .setThumbnail("https://farm1.staticflickr.com/891/28044949567_ef8d140588.jpg")
                    .addFields(
                        { name: "help", value: "Shows this help message to you.", inline: true },
                        { name: "about", value: "Some information about me.", inline: true },
                        { name: "awaken", value: "Watch me awaken again and again and again and... :flushed:", inline: true },
                        { name: "boobs", value: "Vital stats for all pixies on Asgard.", inline: true },
                        { name: "b <pixie name>", value: "Vital stats for named pixies only. Example, r!b rachel", inline: true },
                        { name: "episode", value: "How to clear my episodes.", inline: true },
                        { name: "joke / jokes / j", value: "Hitting you with Admiral-Freyja-approved jokes.", inline: true },
                        { name: "ping", value: "Checks if I'm alive or not.", inline: true },
                        { name: "poke", value: "Try it if you dare.", inline: true },
                        { name: "pat", value: "Pat me gently... if you're allowed to.", inline: true },
                        { name: "love", value: "Find out who is my eternal lover!", inline: true }
                    )
                ]
            });
            channel.send("\n\nIf you need info on suits, pixies and skills, type r!help.");
            break;

        case "b":
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
            break;

        case "boobs":
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
            break;
    }
});

process.on('unhandledRejection', console.error);

bot.login(process.env.BOT_TOKEN);
