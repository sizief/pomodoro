import React, { Component } from 'react';
import { lastCommitUrl, lastCommitDateTime } from './config/Vars';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <a href={lastCommitUrl}>
            Last update at {lastCommitDateTime}
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
