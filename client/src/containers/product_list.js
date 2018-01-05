import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row, Button, Carousel } from 'react-bootstrap';

import { getProducts } from '../actions/product_actions'
import ProductItem from './product_item';
import { getCart } from '../actions/cart_actions';
import Cart from './cart';

class ProductList extends Component {
  componentDidMount() {
    //dispatch an action
    this.props.getProducts();
    this.props.getCart();
  }
  constructor(props) {
    super();
  }

  render() {
    const ProductList = this.props.products.map((product) =>
      (
        <Col xs={12} sm={6} md={4} key={product._id}>
          <ProductItem
            _id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image} />
        </Col>
      )
    );
    return (
      <Grid>
        <Row style={{ marginTop: '50px' }}>
          {ProductList}
        </Row>
        <Row>
          <Cart />
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getProducts: getProducts,
    getCart: getCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
