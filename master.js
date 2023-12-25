const express = require('express');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');


const botToken = '6838747072:AAFroJt42iJkHRJ25n2j-MRNELWSDVf4bMM';
const chatId = '5167117549';

const bot = new TelegramBot(botToken, { polling: false });

const links = [
  { name: 'Sarkawt Sorani', url: 'https://api.render.com/deploy/srv-cm3h4dgcmk4c73cd29g0?key=PUFAB4ys5c0' },
  { name: 'Sarkawt Arabic', url: 'https://api.render.com/deploy/srv-cm4o8oen7f5s73c0subg?key=hZvD-oq5L_Y' },
];

const checkLinks = async () => {
  let successCount = 0;

  const responses = await Promise.allSettled(links.map(link => axios.get(link.url, { timeout: 20000 })));

  const currentTimeStamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Baghdad' });

  responses.forEach((response, index) => {
    const link = links[index];
    const serverNumber = index + 1;

    if (response.status === 'rejected') {
      const errorMessage = `⚠️ [Alert System Unresponsive] ⚠️\n\nAttention: 🚨 The monitoring system has detected Server SleepDown.!!\n\nSystem Details 🔍\n………………………………………………….\n👨 Moniter-Name: Kosar Tarkhany 👀\n\n💻 System: ${link.name}\n\n🕒 Time-Stamp: ${currentTimeStamp}\n\n🚨 Server-Status: Down\n\n🔢 Server-Number: Server ${serverNumber}\n\n❌ Unresponded-PingNum: 1 Ping`;

      bot.sendMessage(chatId, errorMessage);
    } else {
      successCount++;
      console.log(`Bot got a response for ${link.name}`);
    }
  });

  const uptimePercentage = (successCount / links.length) * 100;
  const reportMessage = `...`; // (Your report message)

  bot.sendMessage(chatId, reportMessage);
};

const app = express();
const port = 3000;

app.get('/send-monitoring-report', (req, res) => {
  checkLinks();
  res.send('Server monitoring report sent!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

setInterval(() => {
  console.log('Executing scheduled check at:', new Date().toLocaleString());
  checkLinks();
}, 12 * 60 * 60 * 1000); 

checkLinks();
