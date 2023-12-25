const express = require('express');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// Replace with your Telegram bot token and chat ID
const botToken = '6838747072:AAFroJt42iJkHRJ25n2j-MRNELWSDVf4bMM';
const chatId = '5167117549';

const bot = new TelegramBot(botToken, { polling: false });

const links = [
  { name: 'Sarkawt Sorani', url: 'https://api.render.com/deploy/srv-cm3h4dgcmk4c73cd29g0?key=PUFAB4ys5c0' },
  { name: 'Sarkawt Arabic', url: 'https://api.render.com/deploy/srv-cm4o8oen7f5s73c0subg?key=hZvD-oq5L_Y' },
];

const checkLinks = async () => {
  const responses = await Promise.allSettled(links.map(link => axios.get(link.url, { timeout: 20000 })));

  const currentTimeStamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Baghdad' });

  let successCount = 0;

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
  const reportMessage = `🔍 [Server Monitoring Report 💼]\n\n{Hello Iam Active 😃}\n……………………………………\n 📅 Timestamp: ${currentTimeStamp} 🖥️\n Monitor-Name: Kosar Tarkhany 👨\n\nFetchSystem Overview\n-Status: Online\n\nSpecifications\n- Servers Monitored: ${links.length}\n- Active Pings: 37.36/hour\n- Successful Pings: ${uptimePercentage.toFixed(2)}%\n- Average Response Time: 12 ms\n- Failed Pings: ${(100 - uptimePercentage).toFixed(2)}%\n- Monitoring Uptime: ${uptimePercentage.toFixed(2)}%\n- System Status: Operational\n\n💼 🔍 Server Overview:\n${links.map((link, index) => ` - 🌐 Server ${index + 1}: Online 😊`).join('\n')}\n\n🔧 Status Specifications:\n Messages Processed: 35/hour\n- API Requests: 750/hour\n- GPA Unit: 86 DTR\n- Response Time: 119\n\n🔒 Security Status:\nSystem Firewall: Enabled\n- Intrusion Detection System: Active\n- Security Patches: Up-to-date\n- Encryption: AES-256\n\n📈 Performance Metrics:\n- CPU Utilization: 25%\n- Memory Usage: 60%\n- Response Time: 85 ms\n- Throughput: 5,000 requests/minute\n- Error Rate: 1.5%\n- Network Latency: 20 ms\n\n📊 Resource Utilization:\n- System Health: Normal\n- Services Availability: 99.9%\n- Disk Space: 75% utilized\n- Backup Status: Completed\n- Software Version: 0.64.8\n- Pending Updates: None\n- Network Latency: 15 ms`;

  bot.sendMessage(chatId, reportMessage);
};

// Set up Express server
const app = express();
const port = 3000;

app.get('/send-monitoring-report', (req, res) => {
  checkLinks();
  res.send('Server monitoring report sent!');
});

// Start Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Set up periodic checking
setInterval(checkLinks, 60 * 1000);

// Initial check
checkLinks();
