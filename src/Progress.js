import React, {Component} from 'react';
import './Progress.scss';

class Progress extends Component{
  render() {
    return (
      <div id="progress">
        <div className="number">{this.props.numberOfDone}/4</div>
	<div className="title">Pomodoro</div>
      </div>
    )
  }
}

export default Progress; 
