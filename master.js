const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; 

app.use(bodyParser.json());

const botToken = process.env.TELEGRAM_BOT_TOKEN || '6666684630:AAElyBHdrMqJBECSWMivJ4uNohAwYmXOLjI'; 
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
        const translatedText = 'تحية طيبة، وشكراً جزيلاً على تقديم الشكر لتقديم إجابات على جميع الأسئلة. كانت كلماتك ملهمة وتعكس التفاؤل. يمكنك التواصل مباشرة مع @SarkawtDxn عند الضغط على اسمه لمزيد من التفاصيل والتواصل مع فريق الدعم.';
        bot.sendMessage(chatId, translatedText);
      }
      
  };

  askQuestion(0);
};

  const buttons = [
    [
      { text: 'عنوان المشروع', callback_data: 'project_notification' },
      { text: 'أنا جاهز للعمل', callback_data: 'button_2' }
    ],
    [
      { text: 'رؤية أشخاص النجاح', url: 'https://t.me/+nm57J6RBeLRhMDNi' },
      { text: 'شبكات التواصل الاجتماعي', callback_data: 'button_4' },
    ],
  ];

  bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    switch (callbackQuery.data) {
case 'project_notification':
  const options = [
    { text: 'تقييم مشروع بصوت', callback_data: 'voice_option' },
    { text: 'تقييم المشروع بالنص', callback_data: 'text_option' },
];


  bot.sendMessage(chatId, 'اختر خيارًا', {
      reply_markup: {
          inline_keyboard: [options],
      },
  });
  break;


        bot.sendMessage(chatId, 'اختر خيارًا', {
          reply_markup: {
            inline_keyboard: [options],
          },
        });
        break;

      case 'text_option':
        
      const textOptionValue = `
      البدء في مشروع الحياة
    مرحباً بكم! في هذا الوقت الجميل، نحن في شركة DXN نتحرك نحو تحقيق مشروعنا.
    تأسست شركة DXN على يد الدكتور ليم سويتشين في عام 1993. لدينا أكثر من 105 مكتبًا رئيسيًا وفروعاً في جميع أنحاء العالم، ولدينا أيضًا مكاتب رئيسية في إقليم كوردستان في جميع المحافل الأربعة. تعمل هذه الشركة في مجال التسويق المباشر.
    تقدم هذه الشركة منتجات صحية ذات جودة عالية تعزز الصحة اليومية. جميع منتجاتنا تعتمد على تكنولوجيا فريدة.
    مكمل غذائي فريد مثل الصابون والشامبو والمحجون.
    مكمل غذائي ثانٍ لتعزيز الغذاء الصحي لتعزيز الصحة العامة ودعم نمو الأطفال والرضع.
    المكمل الغذائي الثالث: مشروبات الطاقة.
    المكمل الغذائي الرابع: منتجات العناية الشخصية مثل كريمات التجميل ومزيلات العرق.
    كيفية العمل في هذه الشركة وكيفية تحقيق الدخل.
    عضو في الشركة ذي ثلاثة إدراكات.
    تقدم هذه الفرصة الدخل الشهري الذي يمكن أن يصل إلى 10،000 دينار وأكثر بكثير دون الحاجة إلى بيع.
    الدخل الثاني: يحصل الفائزون على نقاط على كل عملية بيع وفقًا لسعر البيع وفي نفس الوقت تحقق هذه النقاط رواتب شهرية معينة.
    الدخل الثالث: إذا قمت بتسجيل الأشخاص وفقًا للخطة، فإنك ستصبح قائدًا وتحصل على حصص من المبيعات الشهرية.
    الدخل الرابع: يمكنك الحصول على دخل إضافي من خلال بناء فريق وبيع منتجات الشركة.
    الشركة توفر أربعة خيارات رئيسية.
    1- الصحة
    2- الحرية في الوقت والمكان
    3- دخل مالي مستقر
    4- فرصة عمل عالمية
    إذا كنت ترغب في تحسين حياتك وحياة عائلتك، انضم إلى مشروعك الخاص وكن جزءًا من نجاحنا.
    للحصول على مزيد من المعلومات والبدء في الانضمام، اتصل بالعضو الذي قدم لك هذه الفرصة.
    `;
    
        bot.sendMessage(chatId, textOptionValue);
        break;

      case 'voice_option':
        if (!voiceOptionClicked) {
          voiceOptionClicked = false;

          const audioFilePath = 'arabicvoice.mp3';

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
                'ما هو اسمك؟',
                'كم عمرك؟',
                'أين تعيش؟',
                'هل لديك وظيفة؟',
                'كيف تقضي وقت فراغك؟',
            ];
            
          askQuestions(chatId, questions);
        } else {
          const buttonText = 'انقر هنا';
          const buttonCallback = 'send_images';

          bot.sendMessage(chatId, 'تكرمًا، قد لا أكون على دراية بأسماء الفنانين الحقيقية بسبب طبيعة عملي، ولا يمكنني توليد أسماء بدقة. إذا كنت تقصد شيئًا آخر، يرجى إعطائي مزيد من التفاصيل أو توضيح.' + buttonText, {
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
            bot.sendMessage(chatId, 'يرجى إنشاء اسم فنان لهذه الصورة.');
          }
        };

        sendImage(0);
        break;

        case 'button_3':
          bot.sendMessage(chatId, 'اختر خيارًا', {
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

        bot.sendMessage(chatId, 'اختر خيارًا', {
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
    const greetingMessage = `مرحبًا ${fullName}، أهلاً بك في مشروع حياتك. يرجى النقر على زر (تقييم المشروع) للبدء.`;

  const copyrightMessage = `\n\n\n© ${new Date().getFullYear()} Kosar Tarkhany & Aso Jabary. All Rights Reserved`;

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

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});