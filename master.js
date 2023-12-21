
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

const botToken = process.env.TELEGRAM_BOT_TOKEN || '6879095081:AAFrORCGH9SQ9N68p1enYwGtDzUHXUtLaKM'; 
const bot = new TelegramBot(botToken, { polling: true });

const adminChatId = -1002125523786;

let voiceOptionClicked = false; 

const askQuestions = (chatId, questions) => {
  const askQuestion = (index) => {
    if (index < questions.length) {
      bot.sendMessage(chatId, questions[index], { reply_markup: { force_reply: true } })
        .then((response) => {
          const messageId = response.message_id;
          bot.onReplyToMessage(chatId, messageId, (reply) => {
            bot.forwardMessage(adminChatId, chatId, reply.message_id);
            askQuestion(index + 1);
          });
        });
    } else {
        const translatedText = 'زۆر سپاس بەڕێز بۆ وەڵام دانەوەی هەموو پرسیارەکان. وەڵامەکانی تۆ گەشتوە بە کاک سەرکەوت لە زووترین کات وەڵامت دەداتەوە. دەتوانی لە ڕێگەی کلیک کردن لەم ناوەوە(@SarkawtDxn) بکەونە پەیوەندی ڕاستەوخۆ لەگەڵ بەڕێزیان.';
        bot.sendMessage(chatId, translatedText);
      }
      
  };

  askQuestion(0);
};

  const buttons = [
    [
      { text: 'ناسینی پرۆژە', callback_data: 'project_notification' },
      { text: 'دەمەوێت دەست بکەم بە کار کردن', callback_data: 'button_2' },
    ],
    [
      { text: 'بینینی کەسانی سەرکەوتو', url: 'https://t.me/+nm57J6RBeLRhMDNi' },
      { text: 'سۆشیاڵ میدیاکانمان', callback_data: 'button_4' },
    ],
  ];

  bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    switch (callbackQuery.data) {
case 'project_notification':
  const options = [
    { text: 'ناسینی پرۆژە بە دەنگ', callback_data: 'voice_option' },
    { text: 'ناسینی پرۆژە بە دەق', callback_data: 'text_option' },
];


  bot.sendMessage(chatId, 'هەڵبژاردنێک هەڵبژێرە', {
      reply_markup: {
          inline_keyboard: [options],
      },
  });
  break;


        bot.sendMessage(chatId, 'هەڵبژاردنێک هەڵبژێرە', {
          reply_markup: {
            inline_keyboard: [options],
          },
        });
        break;

      case 'text_option':
        
  const textOptionValue = `
  باس کردنی پرۆژەی زیرەک  
سلاو بەرێزم ئەم کاتەت باش ئێمە لە کۆمپانیای DXN لەگەلتین بۆ رونکردنەوەی پرۆژەکەمان  
کۆمپانیای DXN کۆمپانیاێکی نیودەوڵەتیە لەلایەن دکتۆر لیم سویجین دامەزراوە لە سالی 1993. زیاتر لە 105 ولات ئۆفیس و لقی سەرەکیمان هەیە وە لە کوردستانیش لە هەر چوار پارێزگاکە ئۆفیسی سەرەکیمان هەیە. ئەم کۆمپانیایە کار دەکات لە فرۆشی راستەوخۆ.  
ئەم کۆمپانیایە کۆمەلێک بەرهەمی سروشتی هەیە کە پێداویستی رۆژانەی خەلکە. هەمووی کوالێتی  بەرزوو سەد لە سەد سروشتین.  
بەرهەمە کانیش بریتین لە چوار کۆمەلە  
کۆمەلەی یەکەم . برهەمی پاراستنی کەسی وەک سابون شامپۆ مەحجون وە کۆمەلێک بەرهەمی تر  
کۆمەلەی دووەم . تەواوکەری خۆراکین ئەم کۆمەلەیە ئیش لەسەر تەندروستی ناوەوەی مرۆڤ دەکەن لە نەخۆشیە گەورەکان و بچوکەکان دەیان پارێزن.  
کۆمەلەی سێیەم . خواردنەوەکان وەک قاوەو  
شەربەتەکان. 
 
کۆمەلەی چوارەم . جوانکاری پێست وەک کرێمەکانی روخسار و  پاکەرەوەکان  
کارکردنی بەرێزت چۆنە لەو کۆمپانیایە وە چۆن قازانج دەکەی.  
ئەندامی کۆمپانیا سێ سەرچاوەی قازانجی هەیە . 
یەکەم بەرهەمێک دەکڕێ بۆ نمونە بە 10000هەزار دەتوانێ بە 15000 هەزار یاخوت زیاتر بی فرۆشیتەوە. 
قازانجی دووەم ئەم بەرهەمەی دەی کڕی خالوو پۆینتی لەسەرە واتا هەر بەرهەمێک جۆرە خالێکی لەسەرە بە پێی نرخی بەرهەمەکە وە لە سەر ئەم خالانە مانگانە داهات وەر دەگری لە شەریکە.  
قازانجی سێیەم . تۆ کەسانی وەک خۆت دەکەیتە ئەندام لەسەر ناوی خۆت ئەوانیش بە هەمان شێوەی تۆ فرۆش دەکەن و خاڵ کۆ دەکەنەوە قازانجی خۆیان وەر دەگرن وە لە رێگەی ئەم کەسانەوە قازانجوو خاڵ بۆ تۆ دێ بێ ئەوەی لە خاڵ و قازانجی ئەوان کەم بکا بەڵکو  کۆمپانیا پێت دەدات لە قازانجی خۆی.  
تێبینی . ئەگەری زەرەر کردن %0  وە هیچ بڕە پارەێک نادەی بۆ ئەندام بون وە دەتوانی لە ڕێگەی ئۆنلاینەوە بەرهەمەکان بفرۆشی تەنها تۆ لەسەرتە وەسل بکەی هەموو شتێک شەریکە جێ بە جێی دەکات  
تۆ چوار خال بەدەست دێنی لەگەل کۆمپانیا   
1- تەندروستی  
2-ئازادی لە کات و شوێن  
3- داهاتی بەرز  
4- گەشتی نێودەولەتی  
ئەگەر دەتەوێ ژیانی خۆت و خانەوادەکەت بگۆری وەببیتە خاوەن پرۆژەی خۆت وە بێیتە ژینگەێکی ئەرێنێ و سەرکەوتو ئێمە دەتوانی یارمەتیت بدەین تا دەگەیتە باشترین ئاست  
بۆ وەرگرتنی زانیاری و بون بە ئەندام بون بە ئەندام وەرنە قۆناخی دواتر
`;


        bot.sendMessage(chatId, textOptionValue);
        break;

      case 'voice_option':
        if (!voiceOptionClicked) {
          voiceOptionClicked = false;

          const audioFilePath = 'mahdyvoice.mp3';

          try {
            const audioBuffer = fs.readFileSync(audioFilePath);
            bot.sendVoice(chatId, audioBuffer);
            console.log('Voice message sent successfully.');
          } catch (error) {
            console.error('Error sending voice message:', error);
          }
        }
        break;

      case 'button_2':
        if (callbackQuery.from.username) {
          const questions = [
            'ناوت چیە؟',
            'تەمەنت چەندە؟',
            'لە کوێ دەژیت؟',
            'ئایا بڕوانامەت هەیە؟',
            'ئایا کاتە بەتاڵەکانت بە چیەوە سەرف دەکەی؟',
          ];
          askQuestions(chatId, questions);
        } else {
          const buttonText = 'کلیک لێرە بکە';
          const buttonCallback = 'send_images';

          bot.sendMessage(chatId, 'تکایە ببورە بەڕێز تۆ ناوی بەکار ‌هێنەرت نیە لەبەر ئەم هۆکارەش وەڵاماکانی تۆ ناگات بە کاک سەرکەوت تکایە لە ڕێگەی دوگمەی خوارەو ناوی بەکار هێنەر دروست بکە ' + buttonText, {
            reply_markup: {
              inline_keyboard: [
                [{ text: buttonText, callback_data: buttonCallback }],
              ],
            },
          });
        }
        break;

      case 'send_images':
        const imagePaths = [
          'not1.jpg',
          'not2.jpg',
          'not3.jpg',
          'not4.jpg',
        ];

        const sendImage = (index) => {
          if (index < imagePaths.length) {
            const imagePath = imagePaths[index];

            bot.sendPhoto(chatId, imagePath)
              .then(() => {
                setTimeout(() => sendImage(index + 1), 500);
              })
              .catch((error) => {
                console.error('Error sending image:', error);
              });
          } else {
            bot.sendMessage(chatId, 'لە ڕێگەی ئەم وێنانەوە ناوی بەکار ‌هێنەر دروست بکە');
          }
        };

        sendImage(0);
        break;

        case 'button_3':
          bot.sendMessage(chatId, 'هەڵبژاردنێک  هەڵبژێرە', {
            reply_markup: {
              inline_keyboard: [
                { text: 'Open Link', url: 'https://t.me/+nm57J6RBeLRhMDNi' },
              ],
            },
          });
          break;
        
      case 'button_4':
        const facebookLink = 'https://t.me/sarkawtdxn';
        const tiktokLink = 'https://www.tiktok.com/@sarkawthalaq?_t=8hbV6bP8p2E&_r=1';
        const instagramLink = 'https://www.facebook.com/profile.php?id=100089276406820&mibextid=2JQ9oc';
        const whatsappLink = 'https://wa.me/9647502354041';

        const socialMediaButtons = [
          [{ text: 'Telegram', url: facebookLink }],
          [{ text: 'TikTok', url: tiktokLink }],
          [{ text: 'Facebook', url: instagramLink }],
          [{ text: 'WhatsApp', url: whatsappLink }],
        ];

        bot.sendMessage(chatId, 'هەڵبژاردنێک  هەڵبژێرە', {
          reply_markup: {
            inline_keyboard: socialMediaButtons,
          },
        });
        break;

      default:
        break;
    }
  });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const fullName = msg.from.first_name + ' ' + msg.from.last_name;
  
    const greetingMessage = ` سڵاو بەڕێز ${fullName} بەخێربێت بۆ پرۆژەی ژیانت تکایە کلیک لە دوگمەی (ناسینی پرۆژە) بکە بۆ دەست پێکردن.`;
  

  const copyrightMessage = `\n\n\n© ${new Date().getFullYear()} Kosar Tarkhany. All Rights Reserved`;

  const combinedMessage = greetingMessage + copyrightMessage;

  bot.sendMessage(chatId, combinedMessage, {
    reply_markup: {
      inline_keyboard: buttons,
    },
  });
});

app.get('/ping', (req, res) => {
  console.log('Received ping at:', new Date().toISOString());

  
  lastPingTimestamp = Date.now();

  const chatId = req.query.chatId || adminChatId;
  const message = 'Pong!';

  setTimeout(() => {
    bot.sendMessage(chatId, message)
      .then(() => {
        console.log('Pong response sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending Pong response:', error);
      });
  }, 20000); 

  res.status(200).json({ message: 'Ping successful' });
});

setInterval(() => {
  const currentTime = Date.now();
  const timeSinceLastPing = currentTime - lastPingTimestamp;

  if (timeSinceLastPing >= 15 * 60 * 1000) {
    const alertMessage = 'Ping Service Is Down!';
    const alertChatId = -4074916304;

    bot.sendMessage(alertChatId, alertMessage)
      .then(() => {
        console.log('Alert message sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending alert message:', error);
      });
  }
}, 60000);


setInterval(() => {
  const currentTime = Date.now();
  const timeSinceLastPing = currentTime - lastPingTimestamp;

  if (timeSinceLastPing >= 15 * 60 * 1000) {
    const alertMessage = 'Ping Service Is Down!';
    const alertChatId = -4074916304;

    bot.sendMessage(alertChatId, alertMessage)
      .then(() => {
        console.log('Alert message sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending alert message:', error);
      });
  }
}, 60000);

let isScheduledTaskActive = false;
let intervalId;
const startScheduledTask = () => {
  isScheduledTaskActive = true;
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    if (hours >= 6 && hours < 26) {
      console.log('Scheduled task is active.');
    } else {
      stopScheduledTask();
    }
  }, 60000);
};
const stopScheduledTask = () => {
  isScheduledTaskActive = false;
  clearInterval(intervalId);
  console.log('Scheduled task is stopped.');
};
startScheduledTask();
intervalId = setInterval(() => {
  const currentTime = new Date();
  const hours = currentTime.getHours();

  if (hours === 6 && !isScheduledTaskActive) {
    startScheduledTask();
  } else if (hours === 2 && isScheduledTaskActive) {
    stopScheduledTask();
  }
}, 60000);
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});