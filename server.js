const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Конфигурация для отправки электронных писем
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', // Ваша почта
    pass: 'your_email_password' // Пароль от вашей почты
  }
});

// Обработчик POST-запроса для отправки кода на почту
app.post('/sendCode', (req, res) => {
  const email = req.body.email;
  const confirmationCode = req.body.confirmationCode;

  // Настройка письма
  const mailOptions = {
    from: 'your_email@gmail.com', // Ваша почта
    to: email,
    subject: 'Код подтверждения',
    text: `Ваш код подтверждения: ${confirmationCode}`
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Ошибка при отправке письма');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Письмо успешно отправлено');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
