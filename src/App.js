import React, { Component } from 'react';
import AppRouter from './AppRouter';
import Header from './Header';
import './App.scss';
import { UserProvider, UserModel } from './context/UserContext';

class App extends Component {
  render() {
    return (
      <div id="app">
        <UserProvider value={UserModel}>
          <Header className="header" />
          <AppRouter className="main" />
        </UserProvider>
      </div>
    );
  }
}

export default App;
