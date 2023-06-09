const express = require('express');
var ip = require("ip");

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => res.send(ip.address()));
app.listen(PORT, () => console.log('Server listening at port 3000'))