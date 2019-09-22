import React, {Component} from 'react';
import './Total.scss';

class Total extends Component{
  render() {
    return (
      <div id="total">
        <div className="number">{this.props.total}</div>
	<div className="total">Total</div>
      </div>
    )
  }
}

export default Total; 
