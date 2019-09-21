import React, {Component} from 'react';
import './CountingDialogue.scss';

class CountingDialogue extends Component{
  selection(type) {
    this.props.onStartCounting(type === 'break' ? true : false);
  }
  
  render() {
    return (
      <div className="buttons"> 
	<div className="button" onClick={this.selection.bind(this, 'work')}>
	    {this.props.workTime} minutes work
	    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#506473" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="bevel"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
	</div>

	<div className="button" onClick={this.selection.bind(this, 'break')}>
	    {this.props.breakTime} minutes break
	    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#506473" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="bevel"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
	</div>
      </div>
    )
  }
}

export default CountingDialogue; 
