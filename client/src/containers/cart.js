import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Panel, Col, Row, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import { getCart, deleteFromCart, updateCart } from '../actions/cart_actions';

class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  onDelete(_id) {
    const currentProductToDelete = this.props.cart;
    // Determine which index in cart array to delete
    const indexToDelete = currentProductToDelete.findIndex((cart) => cart._id === _id);

    let cartAfterDelete = [ ...currentProductToDelete.slice(0, indexToDelete),
    ...currentProductToDelete.slice(indexToDelete + 1) ];

    this.props.deleteFromCart(cartAfterDelete);
  }

  onDecrement(_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1, this.props.cart);
    } else {
      return;
    }
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1, this.props.cart);
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.bitcoinWalletImage = require('../images/wallet.png');
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    if (this.props.cart[ 0 ]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }

  }

  renderEmpty() {
    return (<div></div>);
  }

  renderCart() {
    const cartItemsList = this.props.cart.map(function (cartItem) {
      return (
        <Panel key={cartItem._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartItem.name}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>$ {cartItem.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>x {cartItem.quantity}</h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{ minWidth: '300px' }}>
                <Button onClick={this.onDecrement.bind(this, cartItem._id, cartItem.quantity)} bsStyle="warning" bsSize="small">-</Button>
                <Button onClick={this.onIncrement.bind(this, cartItem._id)} bsStyle="warning" bsSize="small">+</Button>
                <Button onClick={this.onDelete.bind(this, cartItem._id)} bsStyle="danger" bsSize="small">Delete</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6>Items: {this.props.totalQty}</h6>
            <h6>Total Amount: ${this.props.totalAmount}</h6>
            <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Purchase</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Just transfer to the following Bitcoin address and we
                    will process your order automatically.
                </h4>
                <Image
                  className="payment-method"
                  alt src={this.bitcoinWalletImage}
                  title="Wallet 1PrhdEBmdiYydUJEnDGLmwYk3pbVvDDdMg"
                  responsive />
              </Modal.Body>
              <Modal.Footer>
                <Row>
                  <Col xs={6}>
                    <h6>Total Amount: ${this.props.totalAmount}</h6>
                  </Col>
                  <Button onClick={this.close.bind(this)}>
                    Close
                  </Button>
                  <Button bsStyle="success" style={{ marginRight: '14px' }}>
                    BUY
                  </Button>
                </Row>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
    totalQty: state.cart.totalQty
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteFromCart: deleteFromCart,
    updateCart: updateCart,
    getCart: getCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
