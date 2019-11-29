import React, { Component } from 'react';
import './CountingDialogue.scss';

class CountingDialogue extends Component {
  selection(type) {
    this.props.onStartCounting(type === 'break');
  }

  render() {
    return (
      <div id="counting-dialogue">
        <div className="buttons">
          <div className="button" onClick={this.selection.bind(this, 'work')}>
            <div className="number">{this.props.workTime}</div>
	      minutes work
          </div>

          <div className="button" onClick={this.selection.bind(this, 'break')}>
            <div className="number">{this.props.breakTime}</div>
            {' '}
minutes break
          </div>
        </div>
      </div>
    );
  }
}

export default CountingDialogue;
