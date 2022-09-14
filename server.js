const https = require('https');
const Discord = require('discord.js');
const auth = require('./auth.json');

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
    case "!joke":
      message.channel.send("Here's your joke!");
      randomizeJoke(channel);
      break;
   }
}).on('error', (e) => {
      console.error(e);
    });


process.on('unhandledRejection', console.error);

bot.login(process.env.BOT_TOKEN);
