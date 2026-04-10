const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is alive');
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

bot.once('clientReady', () => {
  console.log(`READY: logged in as ${bot.user.tag}`);
});

bot.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content === 'r!ping') {
    await message.channel.send('pong');
  }
});

bot.on('error', err => console.error('CLIENT ERROR:', err));
bot.on('warn', msg => console.warn('CLIENT WARN:', msg));
bot.on('shardError', err => console.error('SHARD ERROR:', err));
bot.on('shardDisconnect', (event, id) => {
  console.error(`SHARD DISCONNECT ${id}: code=${event?.code} reason=${event?.reason}`);
});
bot.on('shardReconnecting', id => {
  console.log(`SHARD RECONNECTING ${id}`);
});
bot.on('shardReady', id => {
  console.log(`SHARD READY ${id}`);
});

process.on('unhandledRejection', err => console.error('UNHANDLED REJECTION:', err));
process.on('uncaughtException', err => console.error('UNCAUGHT EXCEPTION:', err));

console.log('About to log in to Discord...');
console.log('BOT_TOKEN exists:', !!process.env.BOT_TOKEN);

setTimeout(() => {
  console.error('Still not ready after 20 seconds.');
}, 20000);

bot.login(process.env.BOT_TOKEN)
  .then(() => console.log('Login promise resolved'))
  .catch(err => console.error('Login failed:', err));
