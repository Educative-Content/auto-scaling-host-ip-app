const express = require('express');
const cookieParser = require('cookie-parser')
var ip = require("ip");

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => {
  res.send('Host IP: '+ ip.address() +'<br>Custom cookie value: '+ req.cookies.custom_cookie);
});

app.get('/set_custom_cookie',(req, res) => {
  res.cookie(`custom_cookie`,`EDUCATIVE`);
  res.send('Host IP: '+ ip.address() + '<br>Custom cookie has been saved successfully');
});

app.listen(PORT, () => console.log('Server listening at port 3000'));
