const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);

const app = express();

app.get('/', (req, res) => {
  res.send({ Hello: 'World!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log(`Server listening on port ${PORT}\n`);
