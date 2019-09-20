import React, {Component} from 'react';
import './Countdown.css';

class Countdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      timer: props.seconds,
      status: 'counting'
    }
  }
  
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick(){
    if (this.state.timer > 0){
      this.setState({timer: this.state.timer-1});
    }else{
      this.props.onDone();
    }
  }

  counter(){
    return(
      `${Math.floor(this.state.timer/60)}:${this.state.timer % 60}`
    )
  }

  render() {
    return (
      <div> 
        <div id="countdown">{this.counter()}</div>
      </div>
    )
  }
}

export default Countdown; 
