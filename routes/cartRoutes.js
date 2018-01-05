const mongoose = require('mongoose');

module.exports = (app) => {
  app.post('/api/cart', function (req, res) {
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function (err) {
      if (err) {
        console.error("#API POST CART: ", err);
      }
      res.json(req.session.cart);
    })
  });

  app.get('/api/cart', function (req, res) {
    if (typeof req.session.cart !== 'undefined') {
      res.json(req.session.cart);
    }
  });

};
