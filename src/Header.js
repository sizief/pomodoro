import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Login from './Login';

class Header extends Component {
  status() {
    if (!this.props.counting) return;

    if (this.props.isBreak) {
      return <div className="status">Rest!</div>;
    }
    return <div className="status">Focus!</div>;
  }

  render() {
    return (
      <div className="header">
        <div className="title">
          <Link to="/">
            <img src="pomodoro.png" id="logo" alt="pomodoro" title="pomodoro" />
            POMODORO
          </Link>
        </div>
        <div className="nav">
          <Link to="history">History</Link>
        </div>
        <div className="login">
          <Login />
        </div>
        {this.status()}
      </div>
    );
  }
}

export default Header;
