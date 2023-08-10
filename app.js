const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ip = require("ip");

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: '1234453233',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  let form = `
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #F3F3F3; font-family: Arial, sans-serif;">
    <form action="/set_values" method="POST" style="margin-bottom: 20px;">
      <label for="customCookie" style="color: #3498DB; font-size: 1.2em;">Enter cookie value:</label><br>
      <input type="text" id="customCookie" name="customCookie" style="margin-top: 10px; padding: 5px;"><br>
      <label for="sessionValue" style="color: #3498DB; font-size: 1.2em; margin-top: 10px;">Enter session value:</label><br>
      <input type="text" id="sessionValue" name="sessionValue" style="margin-top: 10px; padding: 5px;"><br>
      <input type="submit" value="Submit" style="margin-top: 10px; padding: 5px; background-color: #2ECC71; border: none; color: white; cursor: pointer;">
    </form>
    <div style="color: #7F8C8D; margin-bottom: 20px;">
      Host IP: ${ip.address()}<br>
      Cookie value: ${req.cookies.custom_cookie || 'No cookie value set'}<br>
      Session value: ${req.session.mysession || 'No session value set'}
    </div>
    <a href="/clear_cookie" style="color: #E74C3C; text-decoration: none;">Clear Cookie</a>
  </div>`;
  
  res.send(form);
});

app.post('/set_values', (req, res) => {
  let cookieValue = req.body.customCookie;
  let sessionValue = req.body.sessionValue;
  
  res.cookie(`custom_cookie`, cookieValue);
  req.session.mysession = sessionValue;

  res.redirect('/');
});

app.get('/clear_cookie', (req, res) => {
  res.clearCookie('custom_cookie');
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
