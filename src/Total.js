import React, {Component} from 'react';
import './Total.css';

class Total extends Component{
  render() {
    return (
      <div id="total">{this.props.total}</div>
    )
  }
}

export default Total; 
