// Set test environment URI to local for optimal performance
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let server = require('../index');
let expect = chai.expect;
let should = chai.should();
let request = require('supertest');

let Cookies;

describe('Functional Test for Cart/Sessions:', function () {
  let firstProduct = {
    name: "Sample Tea",
    description: "Tea for testing",
    price: 2.50,
    image: 'http://example.com/example.jpg'
  };
  let newProduct;

  let cart = []

  it('should create cart from session', function (done) {
    cart.push(firstProduct);

    request(server)
      .post('/api/cart')
      .set('Accept', 'application/json')
      .send(cart)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);

        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers[ 'set-cookie' ].pop().split(';')[ 0 ];
        done();
      });
  });


  it('should insert a new item to the session cart', function (done) {
    newProduct = {
      name: 'Strong Tea',
      description: 'Tea from Valhalla',
      price: 7.77,
      image: firstProduct.image
    };
    cart.push(newProduct);

    let req = request(server).post('/api/cart');
    req.cookies = Cookies;

    req.set('Accept', 'application/json')
      .send(cart)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);

        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers[ 'set-cookie' ].pop().split(';')[ 0 ];
        done();
      });
  });

  it('should get the cart of current session', function (done) {
    var req = request(server).get('/api/cart');
    // Set cookie to get saved user session
    req.cookies = Cookies;
    req.set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);

        let firstProduct = res.body[ 0 ];
        expect(firstProduct).to.have.property('name');
        expect(firstProduct).to.have.property('price');
        expect(firstProduct).to.have.property('description');
        expect(firstProduct).to.have.property('image');
        expect(firstProduct).not.to.have.property('value');
        expect(firstProduct.name).to.be.equal(firstProduct.name);
        expect(firstProduct.description).to.be.equal(firstProduct.description);
        expect(firstProduct.price).to.be.equal(firstProduct.price);
        expect(firstProduct.image).to.be.equal(firstProduct.image);

        let secondProduct = res.body[ 1 ];
        expect(secondProduct).to.be.deep.equals(newProduct);
        expect(secondProduct).to.not.be.deep.equals(firstProduct);

        done();
      });
  });
});
