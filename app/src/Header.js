import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import Login from './Login';

class Header extends Component {
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
          <Link className='item' to="history">Activities</Link>
          <Link className='item' to="project">Projects</Link>
        </div>
        <div className="login">
          <Login />
        </div>
      </div>
    );
  }
}

export default Header;
