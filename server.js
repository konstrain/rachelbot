const https = require('https');
const fs = require('fs');
const path = require('path');
const { getMood } = require('./mood');
const inputFile2 = 'vitalStats.csv';

console.log("Processing CSV file");

// ---------------- EXPRESS (KEEP ALIVE) ----------------

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// ---------------- DISCORD SETUP ----------------

const OWNER_ID = '350550564527931392';

const Discord = require('discord.js');
const { GatewayIntentBits, EmbedBuilder } = Discord;
const auth = {
  prefix: process.env.BOT_PREFIX || "."
};

const bot = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ---------------- DEBUG LOGGING ----------------

bot.on('error', console.error);
bot.on('warn', console.warn);

bot.on('shardError', error => console.error('[SHARD ERROR]', error));

bot.on('shardDisconnect', (event, id) => {
    console.error(`[SHARD DISCONNECT] shard ${id} code=${event?.code} reason=${event?.reason}`);
});

bot.on('shardReconnecting', id => {
    console.log(`[SHARD RECONNECTING] shard ${id}`);
});

bot.on('shardReady', id => {
    console.log(`[SHARD READY] shard ${id}`);
});

// ---------------- READY ----------------

bot.once('clientReady', () => {
    console.log('Connected yo! Can you see me!?');

    const moodText = {
        cheerful: "in a good mood 😊",
        playful: "feeling mischievous 😏",
        sarcastic: "not impressed 🙄",
        sleepy: "half asleep 😴"
    };

    const updateActivity = () => {
        const mood = getMood();

        bot.user.setActivity(
            `with @konstrain#8200 | ${auth.prefix}help | ${moodText[mood]}`
        );
    };

    updateActivity();
    setInterval(updateActivity, 30000);

    // ---------------- RANDOM TALK ----------------

    const TALK_CHANNELS = [
        '453918676022722561',
        '1301455116460752936'
    ];

    const randomTalk = () => {
        const mood = getMood();

        const lines = {
            cheerful: [
                "It's oddly peaceful right now… I like it.",
                "I feel like something good is about to happen.",
                "You all seem quieter today.",
                "Mm… this is a nice moment."
            ],
            playful: [
                "Someone’s definitely up to something.",
                "It’s too quiet… suspicious.",
                "I’m watching, you know.",
                "Try something. I dare you."
            ],
            sarcastic: [
                "Fascinating. Silence.",
                "No one has anything interesting to say?",
                "This is… underwhelming.",
                "Remarkable. Truly."
            ],
            sleepy: [
                "...it’s quiet.",
                "Mm… I could fall asleep here.",
                "Wake me if something interesting happens.",
                "I’m… still here."
            ]
        };

        const pool = lines[mood];
        const text = pool[Math.floor(Math.random() * pool.length)];

        const randomChannelId = TALK_CHANNELS[Math.floor(Math.random() * TALK_CHANNELS.length)];
        const channel = bot.channels.cache.get(randomChannelId);

        if (channel && channel.isTextBased()) {
            channel.send(text).catch(console.error);
        }
    };

    // every hour, 25% chance
    setInterval(() => {
        if (Math.random() < 0.25) {
            randomTalk();
        }
    }, 60 * 60 * 1000);
});

// ---------------- COMMAND LOADER ----------------

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

// ---------------- RANDOM JOKE ----------------

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

// ---------------- BOT LOGIC ----------------

bot.on('messageCreate', async message => {

    if (message.author.bot) return;

    if (message.content.startsWith(".say")) {
        const saymsg = message.content.replace(".say", "").trim();
        if (saymsg.length > 0) {
            await message.channel.send(saymsg);
        }
        return; // removed delete to avoid permission error
    }

    if (!message.content.toLowerCase().startsWith(auth.prefix.toLowerCase())) return;

    const text = message.content;
    const channel = message.channel;

    const args = text.slice(auth.prefix.length).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();

    console.log("Command received:", cmd);

    const context = {
        OWNER_ID,
        randomizeJoke,
        auth,
        commands,
        inputFile2,
        getMood
    };

    const modularCommand = commands.get(cmd);

    if (modularCommand) {
        try {
            return await modularCommand.execute(message, args, channel, context);
        } catch (err) {
            console.error("Command error:", err);
            channel.send("...something went wrong.");
        }
    }
});

// ---------------- LOGIN ----------------

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

console.log("About to log in to Discord...");
console.log("BOT_TOKEN exists:", !!process.env.BOT_TOKEN);

const loginTimeout = setTimeout(() => {
    console.error("Login appears stuck after 20 seconds.");
}, 20000);

bot.login(process.env.BOT_TOKEN)
    .then(() => {
        clearTimeout(loginTimeout);
        console.log("Login request sent to Discord");
    })
    .catch(err => {
        clearTimeout(loginTimeout);
        console.error("Login failed:", err);
    });
