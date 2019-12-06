import React, { Component } from 'react';
import AppRouter from './AppRouter';
import Header from './Header';
import './App.scss';
import { UserProvider } from './context/UserContext';

class App extends Component {
  constructor(){
    super();
    this.state =  {
      givenName: 'Guest',
      accessId: null,
      loggedIn: false,
      setGivenName: (value) => this.setState({givenName: value}),
      setLoggedIn: (value) => this.setState({loggedIn: value}),
      setAccessId: (value) => this.setState({accessId: value})
    }
  }
  
  render() {
    return (
      <div id="app">
        <UserProvider value={this.state}>
          <Header className="header" />
          <AppRouter className="main" />
        </UserProvider>
      </div>
    );
  }
}

export default App;
