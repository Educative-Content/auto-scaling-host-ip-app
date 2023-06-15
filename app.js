const express = require('express');
const cookieParser = require('cookie-parser')
var ip = require("ip");

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => {
  let form = `
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #F3F3F3; font-family: Arial, sans-serif;">
    <form action="/set_custom_cookie" method="POST" style="margin-bottom: 20px;">
      <label for="customCookie" style="color: #3498DB; font-size: 1.2em;">Enter custom cookie value:</label><br>
      <input type="text" id="customCookie" name="customCookie" style="margin-top: 10px; padding: 5px;"><br>
      <input type="submit" value="Submit" style="margin-top: 10px; padding: 5px; background-color: #2ECC71; border: none; color: white; cursor: pointer;">
    </form>
    <div style="color: #7F8C8D; margin-bottom: 20px;">
      Host IP: ${ip.address()}<br>
      Current custom cookie value: ${req.cookies.custom_cookie || 'undefined'}
    </div>
    <a href="/clear_custom_cookie" style="color: #E74C3C; text-decoration: none;">Clear Cookie</a>
  </div>`;
  
  res.send(form);
});

app.post('/set_custom_cookie',(req, res) => {
  let cookieValue = req.body.customCookie;
  res.cookie(`custom_cookie`, cookieValue);
  res.send(`<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #F3F3F3; font-family: Arial, sans-serif;">
  <div style="color: #7F8C8D; margin-bottom: 20px;">
    Host IP: ${ip.address()}<br>
    Custom cookie has been saved successfully with value: ${cookieValue}
  </div>
  <a href="/" style="color: #3498DB; text-decoration: none;">Back</a>
  </div>`);
});

app.get('/clear_custom_cookie',(req, res) => {
  res.clearCookie('custom_cookie');
  res.send(`<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #F3F3F3; font-family: Arial, sans-serif;">
  <div style="color: #7F8C8D; margin-bottom: 20px;">
    Host IP: ${ip.address()}<br>
    Custom cookie has been cleared successfully
  </div>
  <a href="/" style="color: #3498DB; text-decoration: none;">Back</a>
  </div>`);
});

app.listen(PORT, () => console.log('Server listening at port 3000'));
