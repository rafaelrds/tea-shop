import React, { Component } from 'react';
import './App.css';
import ProductList from './containers/product_list'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tea Shop</h1>
        </header>
        <p className="App-intro">
        </p>
        <ProductList />
      </div>
    );
  }
}

export default App;
