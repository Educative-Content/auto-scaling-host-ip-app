const express = require('express');
const cookieParser = require('cookie-parser')
var ip = require("ip");

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => {
  res.cookie(`custom_cookie`,`custom cookie value`);
  res.send(ip.address() + '\nCookie have been saved successfully');
});

app.listen(PORT, () => console.log('Server listening at port 3000'));
