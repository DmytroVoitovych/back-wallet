const nodemailer = require('nodemailer');
require('dotenv').config();
const { PASSWORD } = process.env;

const config = {  
  host: 'smtp.meta.ua', //smtp выступает в качестве прокладки между отправителем и получателем , кароче говоря почтальон
  port: 465,  // защищенный SSL ПОРТ раньше был 25
  secure: true,
  auth: {    // данные отправителя 
    user: 'begunec23@meta.ua',
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);  // создаем транспортер с описаными выше настройками

module.exports = transporter;

/* закомичено для понимания */
// const emailOptions = {
//   from: 'begunec23@meta.ua', // отправитель
//   to: 'begunec23@gmail.com', // получатель
//   subject: 'Nodemailer test',   //тема письма
//   text: 'Привет. Мы тестируем отправку писем!', // отправляемый текст
// };



// transporter
//   .sendMail(emailOptions)   // без переданого колбека возвращает промис // первым параметром принимает обьект настройки сообщения
//   .then(info => console.log(info))
//   .catch(err => console.log(err));

//********************************** */