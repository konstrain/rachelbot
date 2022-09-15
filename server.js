const https = require('https');

var fs = require('fs');
var parse = require('csv-parse');

var inputFile = 'expCalc.csv';
var inputFile2 = 'vitalStats.csv';
console.log("Processing CSV file");

const Discord = require('discord.js');
const auth = require('./auth.json');

const bot = new Discord.Client({ intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_BANS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES"] })

//var bot = new Discord.Client();
bot.on('ready', (evt) => {
    bot.user.setActivity(`with @konstrain#8200 | ${auth.prefix}help | ${bot.users.size} | Here?`);
    console.log('Connected yo! Can you see me!? ');
}).on('error', (e) => {
    console.error(e);
});

var myLines = ['You calling me a joke poke, captain? Not funny...', 'Ouch, stop that right now!', 'Okay, can you just ping me instead?', 'Now that\'s pretty rude, Captain',
    'Captain, I\'m married to <@350550564527931392>. Quit poking me.', 'If you didn\'t notice, I WAS JOKING! Now, why don\'t you pick other pixies to poke?',
    'I woke up to find you poke me, drinking coke, sharing joke, what a bloke, gone for smoke, down for choke, eventually broke, get a heatstroke while backstroke, license revoked and stop provoke.'];

var myOwnLines = ['You can poke me anytime, darling Captain.', 'Oh Captain, that feels soo good. Don\'t stop :kissing_closed_eyes:', 'Ouch, that hurts a little. Be gentle..', '**MOANS**',
    'Am I supposed to feel this good?', 'mmmm, ok Captain darling, my turn to poke you.', '**Pokes** you back!', 'I\'m shy, darling.', 'There\'s people watching, Captain.'];

var myWrongHelpLines = [`I don\'t understand that command, captain. Seek ${auth.prefix}help`,
`Captain, did you made a typo? ${auth.prefix}help for better clarity.`,
`See? Alcohol and drugs are a problem. You need ${auth.prefix}help`,
`I don\'t understand you anymore. Go for ${auth.prefix}help`
]

const url = "https://icanhazdadjoke.com/slack";

const randomizeJoke = (channel) => {
    try {
        https.get(url, res => {
            res.setEncoding("utf8");

            let body = "";
            res.on("data", chunk => {
                body += chunk;
            });

            res.on("end", () => {
                body = JSON.parse(body);

                //console.log(`Result: ${body.attachments[0].fallback}`); // for debug purposes
                channel.send({
                    embed: {
                        color: 3447003,
                        title: "Are you ready, Captain?",
                        description: body.attachments[0].fallback
                    }
                });
            });
        }).on('error', (e) => {
            console.error(e);
            channel.send(e);
        });
    } catch (err) {
        console.error(err);
    }
}

bot.on('message', async message => {

    if (message.content.startsWith(".say")) {
        let saymsg = message.content;
        message.channel.send(saymsg.replace(".say", ""));
        message.delete(1);
    }

    var text = message.content;
    var channel = message.channel;

    var args = text.slice(auth.prefix.length).trim().split(/ +/g);
    var cmd = args.shift().toLowerCase();

    switch (cmd) {
        case "ping":
            message.reply("Pong!");
            break;
        case "r!joke":
            //message.channel.send("Here's your joke!");
            randomizeJoke(channel);
            break;
        case "r!jokes":
            //message.channel.send("Here's your joke!");
            randomizeJoke(channel);
            break;
        case "r!j":
            //message.channel.send("Here's your joke!");
            randomizeJoke(channel);
            break;
        case "ping":
            channel.send(`Don\'t ping me, captain. Don\'t r!poke me too... :flushed: `);
            break;
        case "r!poke":
            if (message.author.id === '350550564527931392') {
                channel.send(myOwnLines[Math.floor(Math.random() * myOwnLines.length)]);
            } else {
                channel.send(myLines[Math.floor(Math.random() * myLines.length)]);
            }
            break;
        case "r!about":
            channel.send({
                embed: {
                    color: 3568567,
                    title: "Some information about me, Captain.",
                    fields: [
                        { "name": "Voice artist", "value": "Kaneko Sayaka" },
                        { "name": "Favourite quote", "value": "I don't have a problem with you." },
                        { "name": "Class", "value": "Sniper" },
                        { "name": "Preferred suit", "value": "~~Pauler~~ Atropos, really" },
                        { "name": "Height", "value": "162cm" },
                        { "name": "Vital stats", "value": "75B | 60W | 85H" },
                        { "name": "Personality", "value": "Normally quiet and calm, but will randomly add hilarious quips." },
                        { "name": "Hobby & Speciality", "value": "World chess champion." },
                        { "name": "Married to", "value": "<@350550564527931392>" }
                    ]
                }
            });
            break;
        case 'r!episode':
            channel.send({
                embed: {
                    color: 5685672,
                    title: "How to clear my episodes",
                    description: `Try to get perfect clear, Captain!
**Episode 1** - "Placate Rachel"
**Episode 2** - "No, She looks okay"
**Episode 3** - "I need to organize my thoughts"——————"Be honest"
**Episode 4** - "We only have jokes to rely on!"——————"It's my fault"
**Episode 9** - "Just give her a little hint"——————"I don't know what to do!"`
                }
            });
            break;
        case 'r!awaken':
            channel.send('https://youtu.be/h-70tyy8E3M?t=10m25s');
            break;
        case 'r!help':
            channel.send({
                embed: {
                    color: 5685672,
                    title: (`Some of the best r!jokes in Asgard, Captain.`),
                    description: (`My prefix is r!. The game is confirmed dead. So the only way I can live on, is through this discord channel.`),
                    thumbnail: {
                        "url": "https://farm1.staticflickr.com/891/28044949567_ef8d140588.jpg"
                    },
                    fields: [
                        {
                            "name": "help",
                            "value": "Shows this help message to you.",
                            "inline": true
                        },
                        {
                            "name": "about",
                            "value": "Some information about me.",
                            "inline": true
                        },
                        {
                            "name": "awaken",
                            "value": "Watch me awaken again and again and again and... :flushed:"
                        },
                        {
                            "name": "boobs",
                            "value": "Vital stats for all pixies on Asgard.",
                            "inline": true
                        },
                        {
                            "name": "b <pixie name>",
                            "value": "Vital stats for named pixies only. Example, r!b rachel",
                            "inline": true
                        },
                        {
                            "name": "episode",
                            "value": "How to clear my episodes.",
                            "inline": true
                        },
                        {
                            "name": "joke / jokes / j",
                            "value": "Hitting you with Admiral-Freyja-approved jokes.",
                            "inline": true
                        },
                        {
                            "name": "ping",
                            "value": "Checks if I'm alive or not.",
                            "inline": true
                        },/*
{
"name": "exp <Suit Grade> <Suit Level> <Suit Exp>",
"value": `Check how much exp needed to max. Example, r!exp US 10 50213`

},*/
                        {
                            "name": "love",
                            "value": "Find out who is my eternal lover!"
                        }
                    ]
                }
            });
            channel.send(`\n\n If you need info on suits, pixies and skills, type r!help.`);

            break;

        case "b":
            let [pixie] = args;
            var pixieName = pixie.toUpperCase();

            var parser2 = parse({ delimiter: ',' }, function (err, data) {
                data.forEach(function (line) {
                    var pixies = {
                        "name": line[0],
                        "height": line[1],
                        "bust": line[2],
                        "waist": line[3],
                        "hips": line[4],
                        "avatar": line[5]
                    };

                    if (pixieName === pixies.name) {
                        channel.send({
                            embed: {
                                color: 7154121,
                                title: `Vital stats for ${pixies.name}.`,
                                description: "```Excited yet, Captain? :wink:```",
                                thumbnail: {
                                    "url": pixies.avatar
                                },
                                fields: [
                                    {
                                        "name": "Height",
                                        "value": pixies.height,
                                        "inline": false
                                    },
                                    {
                                        "name": "Bust",
                                        "value": `**${pixies.bust}** - B for Bust, not cup sizes`,
                                        "inline": true
                                    },
                                    {
                                        "name": "Waist",
                                        "value": pixies.waist,
                                        "inline": true
                                    },
                                    {
                                        "name": "Hips",
                                        "value": pixies.hips,
                                        "inline": true
                                    }
                                ]
                            }
                        });
                    }

                })
            });
            fs.createReadStream(inputFile2).pipe(parser2);

            break;
        case "boobs":

            channel.send({
                embed: {
                    color: 7154121,
                    title: "Vital stats for pixies on Asgard",
                    description: "```See who's big or otherwise. Excited yet, Captain? ```",
                    thumbnail: {
                        "url": "https://cdn.discordapp.com/emojis/449888370219286528.png?v=1"
                    },
                    fields: [
                        {
                            "name": "Leahs",
                            "value": "164CM | 87B / 61W / 87H",
                            "inline": true
                        },
                        {
                            "name": "Puris",
                            "value": "163CM | 84B / 55W / 83H",
                            "inline": true
                        },
                        {
                            "name": "Jeanie",
                            "value": "166CM | 86B / 61W / 90H",
                            "inline": true
                        },
                        {
                            "name": "Labi",
                            "value": "173CM | 87B / 57W / 87H",
                            "inline": true
                        },
                        {
                            "name": "Emily",
                            "value": "151CM | 73B / 51W / 78H",
                            "inline": true
                        },
                        {
                            "name": "Erial",
                            "value": "164CM | 86B / 59W / 88H",
                            "inline": true
                        },
                        {
                            "name": "Ophelia",
                            "value": "172CM | 95B / 64W / 93H",
                            "inline": true
                        },
                        {
                            "name": "Naiz",
                            "value": "170CM | 89B / 62W / 89H",
                            "inline": true
                        },
                        {
                            "name": "Rachel (that\'s me!)",
                            "value": "162CM | 75B / 60W / 85H",
                            "inline": true
                        },
                        {
                            "name": "Florence",
                            "value": "169CM | 89B / 62W / 91H",
                            "inline": true
                        },
                        {
                            "name": "Karu",
                            "value": "147CM | 73B / 53W / 78H",
                            "inline": true
                        },
                        {
                            "name": "Kana",
                            "value": "171CM | 90B / 63W / 91H",
                            "inline": true
                        },
                        {
                            "name": "Lacis",
                            "value": "165CM | 86B / 60W / 88H",
                            "inline": true
                        },
                        {
                            "name": "Lita",
                            "value": "148CM | 79B / 56W / 79H",
                            "inline": true
                        },
                        {
                            "name": "Maiyo",
                            "value": "172CM | 98B / 64W / 94H",
                            "inline": true
                        },
                        {
                            "name": "Yulia",
                            "value": "150CM | 74B / 51W / 78H",
                            "inline": true
                        },
                        {
                            "name": "Madi",
                            "value": "169CM | 87B / 62W / 92H",
                            "inline": true
                        }
                    ]
                }
            });

            channel.send({
                embed: {
                    color: 7154121,
                    fields: [
                        {
                            "name": "Devi",
                            "value": "178CM | 95B / 62W / 90H",
                            "inline": true
                        },
                        {
                            "name": "Cubi",
                            "value": "150CM | 74B / 49W / 80H",
                            "inline": true
                        },
                        {
                            "name": "Archi",
                            "value": "167CM | 81B / 61W / 85H",
                            "inline": true
                        },
                        {
                            "name": "April",
                            "value": "154CM | 74B / 55W / 79H",
                            "inline": true
                        },
                        {
                            "name": "Anna",
                            "value": "171CM | 87B / 62W / 90H",
                            "inline": true
                        },
                        {
                            "name": "Irene",
                            "value": "175CM | 101B / 66W / 98H",
                            "inline": true
                        },
                        {
                            "name": "Eres",
                            "value": "165CM | 88B / 59W / 85H",
                            "inline": true
                        },
                        {
                            "name": "Rody",
                            "value": "156CM | 75B / 54W / 80H",
                            "inline": true
                        },
                        {
                            "name": "Madeleine",
                            "value": "165CM | 80B / 60W / 85H",
                            "inline": true
                        },
                        {
                            "name": "Croia",
                            "value": "173CM | 96B / 65W / 95H",
                            "inline": true
                        },
                        {
                            "name": "Bri",
                            "value": "162CM | 77B / 58W / 79H",
                            "inline": true
                        },
                        {
                            "name": "Noel",
                            "value": "165CM | 89B / 59W / 83H",
                            "inline": true
                        },
                        {
                            "name": "Lucy",
                            "value": "161CM | 77B / 56W / 83H",
                            "inline": true
                        },
                        {
                            "name": "Rocinate",
                            "value": "174CM | 89B / 61W / 90H",
                            "inline": true
                        },
                        {
                            "name": "Rylah",
                            "value": "159CM | 82B / 55W / 83H",
                            "inline": true
                        },
                        {
                            "name": "Amy",
                            "value": "167CM | 86B / 61W / 90H",
                            "inline": true
                        },
                        {
                            "name": "Miku",
                            "value": "158CM | ??B / ??W / ??H",
                            "inline": true
                        }
                    ]
                }
            });

            break;
        case "love":
            if (message.author.id === '350550564527931392') {
                channel.send('Do you even need to ask? It\'s definitely you!');
            } else {
                channel.send("The one and only man I love... <@350550564527931392> My life, my love, my hubby.");
            }
            break;
        default:
            channel.send(myWrongHelpLines[Math.floor(Math.random() * myWrongHelpLines.length)]);
            break;
    }
}).on('error', (e) => {
    console.error(e);
});


process.on('unhandledRejection', console.error);

bot.login(process.env.BOT_TOKEN);
