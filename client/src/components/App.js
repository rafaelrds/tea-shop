import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../style/App.css';
import ProductList from '../containers/product_list'
import TeaMenu from './tea_menu';
import Footer from './footer'
import { Nav, NavItem, Navbar, Badge, Row } from 'react-bootstrap';

export class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TeaMenu />
        </header>
        <div className="product-list">
          <ProductList />
        </div>
        <div className="App-footer">
          <Footer />
        </div>
      </div>
    );
  }
}
