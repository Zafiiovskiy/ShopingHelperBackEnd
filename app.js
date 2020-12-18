const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config')

app.use(cors());
app.use(bodyParser.json());

const cartsRoute = require('./router/carts');
app.use('/carts', cartsRoute);

app.get('/', (req, res) => {
    res.send('We are home');
});



mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connection to db succesfull!'));
app.listen(3000);