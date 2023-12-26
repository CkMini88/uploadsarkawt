const express = require('express');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

const botToken = process.env.BOT_TOKEN || '6838747072:AAFroJt42iJkHRJ25n2j-MRNELWSDVf4bMM';
const chatId = '5167117549';

const bot = new TelegramBot(botToken, { polling: false });

const links = [
  { name: 'Sarkawt Sorani', url: 'https://api.render.com/deploy/srv-cm3h4dgcmk4c73cd29g0?key=PUFAB4ys5c0' },
  { name: 'Sarkawt Arabic', url: 'https://api.render.com/deploy/srv-cm4o8oen7f5s73c0subg?key=hZvD-oq5L_Y' },
];

const sendGetRequest = async () => {
  const currentTimeStamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Baghdad' });

  for (const link of links) {
    try {
      const startTime = new Date();
      console.log(`Sending ping to ${link.name} at ${startTime.toLocaleString()}`);
      
      await axios.get(link.url, { timeout: 20000 });

      const endTime = new Date();
      const responseTime = endTime - startTime;

      console.log(`Got a response for ${link.name} at ${endTime.toLocaleString()} in ${responseTime} milliseconds`);

      if (responseTime > 20000) {
        const errorMessage = `⚠️ [Alert System Unresponse] ⚠️\n\nAttention: 🚨 The monitoring system has detected a slow response from Server ${links.indexOf(link) + 1}.!!\n\nSystem Details 🔍\n………………………………………………….\n👨 Moniter-Name: Kosar Tarkhany 👀\n\n💻 System: ${link.name}\n\n🕒 Time-Stamp: ${currentTimeStamp}\n\n⏱️ Response Time: ${responseTime} milliseconds`;

        bot.sendMessage(chatId, errorMessage);
      }
    } catch (error) {
      const errorMessage = `⚠️ [Alert System Unresponsive] ⚠️\n\nAttention: 🚨 The monitoring system has detected Server SleepDown.!!\n\nSystem Details 🔍\n………………………………………………….\n👨 Moniter-Name: Kosar Tarkhany 👀\n\n💻 System: ${link.name}\n\n🕒 Time-Stamp: ${currentTimeStamp}\n\n🚨 Server-Status: Down\n\n🔢 Server-Number: ${links.indexOf(link) + 1}\n\n❌ Unresponded-PingNum: 1 Ping`;

      bot.sendMessage(chatId, errorMessage);
    }

    await new Promise(resolve => setTimeout(resolve, 20000));
  }
};

const sendSelfPing = async () => {
  const currentTimeStamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Baghdad' });

  try {
    const startTime = new Date();
    console.log(`Sending self-ping at ${startTime.toLocaleString()}`);

    await axios.get(process.env.SELF_PING_URL, { timeout: 20000 });

    const endTime = new Date();
    const responseTime = endTime - startTime;

    console.log(`Got a response for self-ping at ${endTime.toLocaleString()} in ${responseTime} milliseconds`);

    if (responseTime > 20000) {
      const errorMessage = `⚠️ [Alert System Unresponse] ⚠️\n\nAttention: 🚨 The monitoring system has detected a slow response from self-ping.!!\n\nSystem Details 🔍\n………………………………………………….\n👨 Moniter-Name: Kosar Tarkhany 👀\n\n💻 System: Self-Ping\n\n🕒 Time-Stamp: ${currentTimeStamp}\n\n⏱️ Response Time: ${responseTime} milliseconds`;

      bot.sendMessage(chatId, errorMessage);
    }
  } catch (error) {
    console.log(`Error sending self-ping: ${error.message}`);
    const errorMessage = `⚠️ [Alert System Unresponsive] ⚠️\n\nAttention: 🚨 The monitoring system has detected Self-Ping Unresponsive.!!\n\nSystem Details 🔍\n………………………………………………….\n👨 Moniter-Name: Kosar Tarkhany 👀\n\n💻 System: Self-Ping\n\n🕒 Time-Stamp: ${currentTimeStamp}\n\n🚨 Server-Status: Down\n\n❌ Unresponded-PingNum: 1 Ping`;

    bot.sendMessage(chatId, errorMessage);
  }
};

const app = express();
const port = 3000;

app.get('/send-monitoring-report', async (req, res) => {
  await sendGetRequest();
  res.send('Server monitoring report sent!');
});

app.get('/self-ping', async (req, res) => {
  await sendSelfPing();
  res.send('Self-ping executed!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

setInterval(async () => {
  console.log('Executing scheduled check at:', new Date().toLocaleString());
  await sendGetRequest();
}, 2 * 60 * 1000);

setInterval(async () => {
  console.log('Executing self-ping check at:', new Date().toLocaleString());
  await sendSelfPing();
}, 1 * 60 * 1000);
