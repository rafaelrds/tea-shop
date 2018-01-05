// Set test environment URI to local for optimal performance
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Product = require('../models/Product');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Products', () => {
  beforeEach((done) => { //Before each test we empty the database
    Product.remove({}, (err) => {
      done();
    });
  });

  /*
    * Test the /GET route
    */
  describe('/GET products', () => {
    it('it should GET all the products', (done) => {
      chai.request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/GET products', () => {
    let product = new Product({
      name: 'Green Tea',
      description: 'Delicious green tea',
      value: 3.99,
      images: './imgs/testimage'
    });

    product.save(function (err, results) {
      it('it should GET all the products', (done) => {
        chai.request(server)
          .get('/api/products')
          .end((err, res) => {

            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);

            done();
          });
      });
    });


  });

});
