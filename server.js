const https = require('https');

var fs = require('fs');
var parse = require('csv-parse');
 
var inputFile='expCalc.csv';
var inputFile2='vitalStats.csv';
console.log("Processing CSV file");

const Discord = require('discord.js');
const auth = require('./auth.json');

const bot = new Discord.Client({intents : ["GUILDS", "DIRECT_MESSAGES", "GUILD_BANS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES"]}) 

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

var myOwnLines = ['You can poke me anytime, darling Captain.','Oh Captain, that feels soo good. Don\'t stop :kissing_closed_eyes:','Ouch, that hurts a little. Be gentle..','**MOANS**',
'Am I supposed to feel this good?','mmmm, ok Captain darling, my turn to poke you.','**Pokes** you back!','I\'m shy, darling.','There\'s people watching, Captain.'];

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
                color:3447003,
                title: "Are you ready, Captain?",
                description:body.attachments[0].fallback
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
        message.channel.send(saymsg.replace(".say",""));
        message.delete(1);
    }
        
  var channel = message.channel;
 
  switch (message.content) {
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
    case "poke":
          if(message.author.id === '350550564527931392') {
              channel.send(myOwnLines[Math.floor(Math.random() * myOwnLines.length)]);
          } else {
              channel.send(myLines[Math.floor(Math.random() * myLines.length)]);
          }
      break;
    case "about":
          channel.send({
                  embed: {
                    color:3568567,
                    title:"Some information about me, Captain.",
                    fields: [
                      {"name":"Voice artist","value":"Kaneko Sayaka"},
                      {"name":"Favourite quote","value":"I don't have a problem with you."},
                      {"name":"Class","value":"Sniper"},
                      {"name":"Preferred suit","value":"~~Pauler~~ Atropos, really"},
                      {"name":"Height","value":"162cm"},
                      {"name":"Vital stats","value":"75B | 60W | 85H"},
                      {"name":"Personality","value":"Normally quiet and calm, but will randomly add hilarious quips."},
                      {"name":"Hobby & Speciality","value":"World chess champion."},
                      {"name":"Married to", "value":"<@350550564527931392>"}
                    ]
                  }
                });
                break;
            case 'episode':
                channel.send({
                  embed: {
                    color:5685672,
                    title:"How to clear my episodes",
                    description: `Try to get perfect clear, Captain!
  **Episode 1** - "Placate Rachel"
  **Episode 2** - "No, She looks okay"
  **Episode 3** - "I need to organize my thoughts"——————"Be honest"
  **Episode 4** - "We only have jokes to rely on!"——————"It's my fault"
  **Episode 9** - "Just give her a little hint"——————"I don't know what to do!"`
                  }
                });
                break;
            case 'awaken':
                channel.send('https://youtu.be/h-70tyy8E3M?t=10m25s');
                break;
            case 'help':
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
                        "name": "joke / jokes",
                        "value": "Hitting you with Admiral-Freyja-approved jokes.",
                        "inline": true
                      },
                      {
                        "name": "ping",
                        "value": "Checks if I'm alive or not.",
                        "inline": true
                      },
                      {
                        "name": "exp <Suit Grade> <Suit Level> <Suit Exp>",
                        "value": `Check how much exp needed to max. Example, r!exp US 10 50213`
                      },
                      {
                        "name": "love",
                        "value": "Find out who is my eternal lover!"
                      }
                      ]
                  }
                });
            channel.send(`\n\n If you need info on suits, pixies and skills, type r!help.`);
            
                break;  
  }
}).on('error', (e) => {
      console.error(e);
    });


process.on('unhandledRejection', console.error);

bot.login(process.env.BOT_TOKEN);
