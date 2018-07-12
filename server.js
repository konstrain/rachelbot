const https = require('https');
const csv = require('csv');
/* const express = require('express');
const app = express(); */

const Discord = require('discord.js');
const auth = require('./auth.json');

var bot = new Discord.Client();
bot.on('ready', (evt) => {
    bot.user.setActivity(`Joke-a-pedia | ${auth.prefix}help | ${bot.guilds.size}`);
    console.log('Connected');
}).on('error', (e) => {
  console.error(e);
});

var obj = csv(); 

function MyCSV(Fone, Ftwo, Fthree) {
  this.FieldOne = Fone;
  this.FieldTwo = Ftwo;
  this.FieldThree = Fthree;
}; 
var MyData = []; 
​
obj.from.path('./expCalc.csv').to.array(function (data) {
  for (var index = 0; index < data.length; index++) {
      MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2]));
  }
  console.log(MyData);
});

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

            console.log(`Result: ${body.attachments[0].fallback}`); // for debug purposes
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

bot.on('message',  message => {
  
  var text = message.content;
  var channel = message.channel;
  

  if (!text.startsWith(auth.prefix) || message.author.bot) return;

  console.log(message.author.username);
  
    if (text.substring(0, 2).toLowerCase() == auth.prefix) {
        //var args = text.substring(2).split(' ');
        //var cmd = args[0].toLowerCase();
        var args = text.slice(auth.prefix.length).trim().split(/ +/g);
        var cmd = args.shift().toLowerCase();
      
        if ((text === 'r!joke') || (text === 'r!jokes')){
            message.react('😄');
        }        
       
        //args = args.splice(1);
        switch(cmd) {
            // !joke
            case 'joke':
                randomizeJoke(channel);
                break;
            case 'jokes':
                randomizeJoke(channel);
                break;
            case 'ping':
                channel.send(`Don\'t ping me, captain. I\'d prefer that you ${auth.prefix}poke me... :flushed: `);
                break;
            case 'poke':
                channel.send('You calling me a joke poke, captain? Not funny...');
                break;
            case 'about':
                channel.send({
                  embed: {
                    color:3568567,
                    title:"Some information about me, Captain.",
                    fields: [
                      {"name":"Voice artist","value":"Kaneko Sayaka"},
                      {"name":"Favourite quote","value":"I don't have a problem with you."},
                      {"name":"Class","value":"Sniper"},
                      {"name":"Preferred suit","value":"Pauler"},
                      {"name":"Height","value":"162cm"},
                      {"name":"Vital stats","value":"75B | 60W | 85H"},
                      {"name":"Personality","value":"Normally quiet and calm, but will randomly add hilarious quips."},
                      {"name":"Hobby & Speciality","value":"World chess champion."}                      
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
                    title: (`Some of the best ${auth.prefix}jokes in Asgard, Captain.`),
                    description: (`My prefix is ${auth.prefix}`),
                    thumbnail: {
                      "url": "https://farm1.staticflickr.com/891/28044949567_ef8d140588.jpg"
                    },
                    fields: [
                      {
                        "name": "help",
                        "value": "Shows this help message to you."
                      },
                      {
                        "name": "ping",
                        "value": "Checks if I'm alive or not."
                      },
                      {
                        "name": "about",
                        "value": "Some information about me."
                      },
                      {
                        "name": "episode",
                        "value": "How to clear my episodes."
                      },
                      {
                        "name": "joke / jokes",
                        "value": "Hitting you with Admiral-Freyja-approved jokes."
                      },
                      {
                        "name": "awaken",
                        "value": "Watch me awaken again and again and again and... :flushed:"
                      }                      
                      ]
                  }
                });
            channel.send(`\n\n If you need info on suits, pixies and skills, type !help.`);
            
                break;

            case 'exp':
                let [suitGrade, suitLvl, suitExp] = args;

                switch (suitGrade) {
                    case 'US':
                    break;

                }

                //channel.send([`${suitGrade} ${suitLvl} ${suitExp}`])


                break;
            default:
                channel.send(`I don\'t understand that command, captain. Seek ${auth.prefix}help`);
                break;
            // Just add any case commands if you want to..
         }
     }
}).on('error', (e) => {
      console.error(e);
    });

process.on('unhandledRejection', console.error);

bot.login(process.env.BOT_TOKEN);