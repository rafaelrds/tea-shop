import React, { Component } from 'react';
import './App.css';
import ProductList from './containers/product_list'
import TeaMenu from './components/tea_menu';
import Footer from './components/footer'
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';


class App extends Component {
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

export default App;
