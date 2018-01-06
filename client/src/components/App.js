import React, { Component } from 'react';

import '../style/App.css';
import ProductList from '../containers/product_list'
import TeaMenu from './tea_menu';
import Footer from './footer'

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
