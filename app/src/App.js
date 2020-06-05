import React, { Component } from 'react';
import AppRouter from './AppRouter';
import Header from './Header';
import Footer from './Footer';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header className="header" />
        <AppRouter className="main" />
        <Footer />
      </div>
    );
  }
}

export default App;
