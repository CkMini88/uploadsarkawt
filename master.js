
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

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
        const translatedText='كثيرًا من الشكر لك بيريز على تقديم جميع الأسئلة. تم الرد على استفساراتك بكل وقت ممكن. يمكنك التواصل مباشرةً معهم عن طريق النقر على هذا الاسم (@SarkawtDxn) للتواصل مع الخبراء';
        bot.sendMessage(chatId, translatedText);
      }
      
  };

  askQuestion(0);
};

  const buttons = [
    [
      { text: 'التعرف على المشروع', callback_data: 'project_notification' },
      { text: 'أريد أن أبدأ العمل.', callback_data: 'button_2' },
    ],
    [
      { text: 'شاهد الأشخاص الناجحين.', url: 'https://t.me/+w0OVDtcL3HUwMWEy' },
      { text: 'وسائل التواصل الاجتماعي الخاصة بنا', callback_data: 'button_4' },
    ],
  ];

  bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    switch (callbackQuery.data) {
case 'project_notification':
  const options = [
    { text: 'التعرف على المشروع من خلال الصوت', callback_data: 'voice_option' },
    { text: 'التعرف على المشروع من خلال نص', callback_data: 'text_option' },
];


  bot.sendMessage(chatId, 'اختر خيارا.', {
      reply_markup: {
          inline_keyboard: [options],
      },
  });
  break;


        bot.sendMessage(chatId, 'اختر خيارا.', {
          reply_markup: {
            inline_keyboard: [options],
          },
        });
        break;

      case 'text_option':
        
      const textOptionValue = `
      إكمال المشروع أدناه  
    مرحبًا بك، هذا الوقت جيد. نحن في شركة DXN في لاتينية لإكمال مشروعنا  
    شركة DXN هي شركة جديدة تمامًا تم إنشاؤها بواسطة الدكتور ليم سويجين في عام 1993. لديهم أكثر من 105 مكتبًا ويتمتعون بشعبيتهم في إقليم كوردستان حيث يوجد لديهم مكاتب في جميع أربع المحافظات. هذه الشركة تعمل في المبيعات المباشرة.  
    هذه الشركة لديها نظام فريد من نوعه يتطلب النشاط اليومي. جميع المنتجات ذات جودة عالية بنسبة 100 في المائة.  
    بيانات العملاء في الربع الأول للعام  
    الربع الأول. منتجات العناية الشخصية مثل الصابون وشامبو ومزيل العرق  
    الربع الثاني. المنتجات الغذائية هذه المنتجات تساعد على تحسين الصحة العامة وتناسب الجميع من الكبار والصغار.  
    الربع الثالث. مشروبات مثل المشروبات الغازية  
    الربع الرابع. العناية بالبشرة مثل الكريمات المرطبة ومزيلات العرق  
    كيفية كسب المال من خلال هذه الشركة وكيفية الحصول على العائدات.  
    يتمتع أعضاء الشركة بثلاث طرق لكسب الأرباح.  
    الطريقة الأولى هي الحصول على عائد شهري يبلغ 10000 دولار أمريكي أو أكثر دون بيع أي شيء.  
    الطريقة الثانية لكسب الأرباح هي بيع المنتجات بشكل شخصي وكسب نقاط على كل منتج تبيعه وبالنسبة لهذه النقاط يمكنك الحصول على دفعة نقدية في نهاية كل شهر.  
    الطريقة الثالثة هي دعوة أشخاص آخرين للانضمام إلى الشركة كأعضاء في فريقك الخاص والحصول على نسبة من أرباحهم ولهم فرصة لتحقيق دخل كبير دون الحاجة إلى أي استثمارات مالية.  
    تنويه: إذا كانت النسبة صفر ولم يتم الحصول على أي دفعة نقدية للانضمام ويمكنك بيع البضائع عبر الإنترنت. كل ما عليك فعله هو البيع النقدي وتوزيع الأرباح بالتساوي مع الشركاء.  
    تستطيع الاستفادة من أرباح هذه الشركة  
    1- الصحة  
    2- الحرية في الوقت والمكان  
    3- العائدات المرتفعة  
    4- الفرص العالمية  
    إذا كنت ترغب في تغيير حياتك وحياة عائلتك والاستمتاع بحياة مريحة وهادئة ، يمكننا مساعدتك في الوصول إلى أعلى مستوى  
    للحصول على المزيد من المعلومات والانضمام إلى الشركة والبدء في جني الأرباح اليوم  
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
            'ما اسمك؟',
            'کم العمرک؟',
            'أين تعيش؟',
            'هل لديك أي شهادة؟',
            'كيف تقضي وقت فراغك؟',
          ];
          askQuestions(chatId, questions);
        } else {
          const buttonText = 'انقر هنا.';
          const buttonCallback = 'send_images';

          bot.sendMessage(chatId, ' الرجاء المعذرة، ليس لديك اسم مستخدم لذا لا يمكنني تقديم تعليقاتك. يرجى إنشاء اسم مستخدم صحيح.' + buttonText, {
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
            bot.sendMessage(chatId, 'قم بإنشاء اسم مستخدم بهذه الصورة.');
          }
        };

        sendImage(0);
        break;

        case 'button_3':
          bot.sendMessage(chatId, 'اختر خيارا.', {
            reply_markup: {
              inline_keyboard: [
                { text: 'Open Link', url: 'https://t.me/+w0OVDtcL3HUwMWEy' },
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

        bot.sendMessage(chatId, 'اختر خيارا.', {
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
    
    const greetingMessage = `مرحبا السيد ${fullName} مرحبا بكم في مشروع حياتك ، يرجى النقر فوق الزر "معرفة المشروع" للبدء.`;
  
    const copyrightMessage = `\n\n\n© ${new Date().getFullYear()} Kosar Tarkhany. All Rights Reserved`;
  
    const combinedMessage = greetingMessage + copyrightMessage;
  
    bot.sendMessage(chatId, combinedMessage, {
      reply_markup: {
        inline_keyboard: buttons,
      },
    });
  });
  
  app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
  });
  