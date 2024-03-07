function generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000);
}


function authenticate() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

   
    // Проверка наличия введенных данных (в реальном приложении лучше делать на стороне сервера)
    if (email && password) {
        // Генерация случайного кода
        var confirmationCode = generateRandomCode();

        // Отображение подтверждения
        document.getElementById('confirmationCode').innerText = confirmationCode;
        document.getElementById('confirmation').classList.remove('hidden');
    } else {
        alert('Введите email и пароль');
    }
}




function sendCodeToEmail(email, confirmationCode) {
    fetch('http://localhost:3000/sendCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, confirmationCode })
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  
  // Ваша функция authenticate() должна теперь вызывать sendCodeToEmail() после успешной генерации кода.
  function authenticate() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    // Проверка наличия введенных данных (в реальном приложении лучше делать на стороне сервера)
    if (email && password) {
      // Генерация случайного кода
      var confirmationCode = generateRandomCode();
  
      // Отправка кода на почту
      sendCodeToEmail(email, confirmationCode);
  
      // Отображение подтверждения
      document.getElementById('confirmationCode').innerText = confirmationCode;
      document.getElementById('confirmation').classList.remove('hidden');
    } else {
      alert('Введите email и пароль');
    }
  }
  