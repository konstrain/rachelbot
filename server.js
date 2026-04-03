const https = require('https');
const fs = require('fs');
const { parse } = require('csv-parse');

const inputFile = 'expCalc.csv';
const inputFile2 = 'vitalStats.csv';
console.log("Processing CSV file");

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

// ------------------- BOT LOGIC -------------------

bot.on('messageCreate', async message => {

    if (message.author.bot) return;

    // .say command
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

    // prefix guard
    if (!message.content.startsWith(auth.prefix)) return;

    const text = message.content;
    const channel = message.channel;

    const args = text.slice(auth.prefix.length).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();

    switch (cmd) {

        case "joke":
        case "jokes":
        case "j":
            randomizeJoke(channel);
            break;

        case "ping":
            channel.send("Don't ping me, captain. Don't r!poke me too... :flushed:");
            break;

        case "poke":
            if (message.author.id === '350550564527931392') {
                channel.send("You can poke me anytime, darling Captain.");
            } else {
                channel.send("Ouch, stop that right now!");
            }
            break;

        case "about":
            channel.send({
                embeds: [new EmbedBuilder()
                    .setColor(3568567)
                    .setTitle("Some information about me, Captain.")
                    .addFields(
                        { name: "Voice artist", value: "Kaneko Sayaka" },
                        { name: "Favourite quote", value: "I don't have a problem with you." },
                        { name: "Class", value: "Sniper" },
                        { name: "Height", value: "162cm" }
                    )
                ]
            });
            break;

        case "help":
            channel.send({
                embeds: [new EmbedBuilder()
                    .setColor(5685672)
                    .setTitle("Some of the best r!jokes in Asgard, Captain.")
                    .setDescription("Use r!joke to get a joke!")
                ]
            });
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
                        .addFields(
                            { name: "Height", value: row[1] },
                            { name: "Bust", value: row[2], inline: true },
                            { name: "Waist", value: row[3], inline: true },
                            { name: "Hips", value: row[4], inline: true }
                        )
                    ]
                });
            });

            fs.createReadStream(inputFile2).pipe(parser);
            break;

        case "love":
            if (message.author.id === OWNER_ID) {
                channel.send("Do you even need to ask? It's definitely you!");
            } else {
                channel.send("The one and only man I love... <@350550564527931392> My life, my love, my hubby.");
            }
            break;
    }
});

// ------------------- START BOT -------------------

process.on('unhandledRejection', console.error);

bot.login(process.env.BOT_TOKEN);
