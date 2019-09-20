import React, {Component} from 'react';
import './Progress.css';

class Progress extends Component{
  render() {
    return (
      <div id="progress">{this.props.numberOfDone}/4</div>
    )
  }
}

export default Progress; 
