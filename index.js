const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/Product');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/productRoutes')(app);

app.get('/api/hello', (req, res) => {
  res.send({ Hello: 'World...' });
});

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}\n`);
});
