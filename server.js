const https = require('https');
const fs = require('fs');
const path = require('path');
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

// ------------------- PAT RESPONSES -------------------

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
        randomizeJoke,
        auth,
        commands,
        inputFile2
    };

    const modularCommand = commands.get(cmd);
    if (modularCommand) {
        return modularCommand.execute(message, args, channel, context);
    }
});

process.on('unhandledRejection', console.error);

bot.login(process.env.BOT_TOKEN);
