const https = require('https');
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
  
  var channel = message.channel;
 
  switch (message.content) {
    case "ping":
      message.reply("Pong!");
      break;
    case "r!joke":
      //message.channel.send("Here's your joke!");
      randomizeJoke(channel);
      break;
    case "r!say":
          channel.send(message.content);
          channel.send(" || HUH || ");
          if(message.author.id === '350550564527931392') {
              const sayMessage = message.content.split(' ').slice(1).join(' ');

              channel.send(sayMessage);
          } else {
              channel.send(`'Sorry Captain ${message.author.username}, you\'re not my hubby.`)
          }
      break;
   }
}).on('error', (e) => {
      console.error(e);
    });


process.on('unhandledRejection', console.error);

bot.login(process.env.BOT_TOKEN);
