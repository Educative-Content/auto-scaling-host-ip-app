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
    <form action="/set_values" method="POST" style="padding: 30px; border: 1px solid #e0e0e0; background-color: #FFFFFF; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); width: 350px;">
      <label for="sessionValue" style="color: #3498DB; font-size: 1.5em;">Enter Session Value:</label><br>
      <input type="text" id="sessionValue" name="sessionValue" placeholder="Enter session value" style="margin-top: 20px; padding: 10px; width: 100%; font-size: 1.2em; border-radius: 3px;"><br>
      <input type="submit" value="Submit" style="margin-top: 30px; padding: 10px 20px; background-color: #2ECC71; border: none; color: white; cursor: pointer; font-size: 1.2em; border-radius: 3px;">
    </form>
    <div style="color: #7F8C8D; margin-top: 30px; background-color: #FFFFFF; padding: 20px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); width: 350px; text-align: center;">
      Host IP: ${ip.address()}<br>
      Session Value: ${req.session.mysession || 'No session value set'}
    </div>
    <a href="/clear_cookie" style="color: #E74C3C; text-decoration: none; margin-top: 20px; font-size: 1.2em;">Clear Session</a>
  </div>`;
  
  res.send(form);
});

app.post('/set_values', (req, res) => {
  let sessionValue = req.body.sessionValue;
  
  res.cookie(`custom_cookie`, 'educative'); // Hardcoded value
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
