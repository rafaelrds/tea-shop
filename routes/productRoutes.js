const mongoose = require('mongoose');
const Product = mongoose.model('products');

module.exports = (app) => {
  app.get('/api/products', (req, res) => {
    Product.find(function (err, products) {
      if (err) {
        res.send(err);
      }
      //responds with a json object of our database products.
      res.json(products);
    });
  });
};
