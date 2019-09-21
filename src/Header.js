import React, {Component} from 'react';
import './Header.scss';

class Header extends Component{
  status() {
    if (!this.props.counting) return;
  	  
    if (this.props.isBreak){	  
      return <div className="status">Rest!</div>
    }else{  
      return <div className="status">Focus!</div>
    }
  }

  render() {
    return(
      <div className="header">	
        <div className="title">
	  <img src="pomodoro.png" id="logo"/>
          POMODORO
        </div>
	{this.status()}      
      </div>
    );
  }
}

export default Header;
