import React, { Component } from 'react';
import moment from 'moment'
import './Footer.scss';
import { lastCommitUrl, lastCommitDateTime } from './config/Vars';

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <a href={lastCommitUrl}>
          Last update {moment(lastCommitDateTime, "YYYY-MM-DDThh:mm:ssZ").fromNow()}
        </a>
      </footer>
    );
  }
}

export default Footer;
