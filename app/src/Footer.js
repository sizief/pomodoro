import React, { Component } from 'react';
import moment from 'moment'
import { lastCommitUrl, lastCommitDateTime } from './config/Vars';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <a href={lastCommitUrl}>
            Last update {moment(lastCommitDateTime, "YYYY-MM-DDThh:mm:ssZ").fromNow()}
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
