// Libraries
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Load environment variables
const keys = require('./config/keys');

// Create schemas
require('./models/Product');

// Start and config Express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Start and config MongoDB connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// Use db variable to achieve a persistent session
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error:'));

// SET UP SESSIONS
app.use(session({
  secret: 'beBold',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days in ms
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}));

// LOADS CART ROUTES
require('./routes/cartRoutes')(app);

// LOADS PRODUCT ROUTES
require('./routes/productRoutes')(app);


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
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}\n`);
});

module.exports = app;
