const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// TELEGRAM 
const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;
const bot = new TelegramBot(token, { webHook: true });

app.post('/form', (req, res) => {
   const formData = req.body;

  let message = `
    <tg-spoiler><b>Data from site</b></tg-spoiler>\n
    <tg-spoiler><b>Name</b> ${formData.name}</tg-spoiler>\n
    <tg-spoiler><b>Email</b> ${formData.email}</tg-spoiler>\n
    <tg-spoiler><b>Text</b> ${formData.text}</tg-spoiler>\n
  `;

  bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
  .then(() => {
    console.log('Message sent to Telegram');
    res.send('Form received!');
  })
  .catch((error) => {
    console.error('Error sending message to Telegram:', error);
    res.status(500).send('Internal Server Error');
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});