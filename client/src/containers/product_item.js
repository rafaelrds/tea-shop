import React, { Component } from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../actions/cart_actions';

class ProductItem extends Component {
  handleCart() {
    const product = [
      ...this.props.cart,
      {
        _id: this.props._id,
        name: this.props.name,
        description: this.props.description,
        image: this.props.image,
        price: this.props.price,
        quantity: 1
      }
    ];

    // check if cart is not empty
    if (this.props.cart.length > 0) {
      let _id = this.props._id;
      let cartIndex = this.props.cart.findIndex(function (cart) {
        // check if that id is already i the cart
        return cart._id === _id;
      });

      // if we return -1 then the cart doens't have that id yet
      if (cartIndex === -1) {
        // add the product
        this.props.addToCart(product);
      } else {
        // else the product is already in the cart
        // so we update quantity by calling updateCart function
        this.props.updateCart(_id, 1, this.props.cart);
      }
    } else {
      // cart is empty, add the bok
      this.props.addToCart(product);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    }

  }

  onReadMore() {
    this.setState({ isClicked: true });
  }

  render() {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image alt src={this.props.image} responsive />
          </Col>
          <Col xs={12} sm={8}>
            <h4>{this.props.name}</h4>
            <p>{(this.props.description.length > 50 && this.state.isClicked === false)
              ? (this.props.description.substring(0, 50))
              : (this.props.description)}
              <button className='link' onClick={this.onReadMore.bind(this)}>
                {(this.state.isClicked === false && this.props.description !== null
                  && this.props.description.length > 50)
                  ? ('...read more')
                  : ('')}
              </button>
            </p>
            <h6>${this.props.price}</h6>
            <Button onClick={this.handleCart.bind(this)} bsStyle="primary">
              Add To Cart
            </Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addToCart: addToCart,
      updateCart: updateCart
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
