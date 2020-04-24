import React, { Component } from 'react';
import AppRouter from './AppRouter';
import Header from './Header';
import './App.scss';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="app">
        <Header className="header" />
        <AppRouter className="main" />
      </div>
    );
  }
}

export default App;
