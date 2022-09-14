const https = require('https');
/* const express = require('express');
const app = express(); */
//var fast_csv = require('fast-csv');
var fs = require('fs');
var parse = require('csv-parse');
 
var inputFile='expCalc.csv';
var inputFile2='vitalStats.csv';
console.log("Processing CSV file");

const Discord = require('discord.js');
const auth = require('./auth.json');

const fetch = require("node-fetch");
const client = new Discord.Client();

/* var bot = new Discord.Client();
bot.on('ready', (evt) => {
    bot.user.setActivity(`with @konstrain#8200 | ${auth.prefix}help | ${bot.users.size} | Here?`);
    console.log('Connected yo! Can you see me!? ');
}).on('error', (e) => {
  console.error(e);
});
*/
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

//var show = myLines[Math.floor(Math.random() * myLines.length)];

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
/*
bot.on('message', async message => {
  
  var channel = message.channel;
 
  switch (message.content) {
    case "ping":
      message.reply("Pong!");
      break;
    case "!joke":
      message.channel.send("Here's your joke!");
      randomizeJoke(channel);
      break;
   }
}).on('error', (e) => {
      console.error(e);
    });
*/

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
      })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot) return
    
  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }
})



process.on('unhandledRejection', console.error);

client.login(process.env.BOT_TOKEN);
