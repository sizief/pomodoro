import React, { Component } from 'react';
import './Pomodoro.scss';
import Countdown from './Countdown';
import Progress from './Progress';
import Total from './Total';
import CountingDialogue from './CountingDialogue';

class Pomodoro extends Component{
  BREAK_TIME = 5;
  WORK_TIME = 25;
  
  constructor(props){
    super();
    this.state = {
      numberOfDone: 0,
      numberOfBreak: 0,
      total: 0,
      counting: false,
      isBreak: false,
      firstTime: true
    }
    this.handleDone = this.handleDone.bind(this);
    this.handleStartCounting = this.handleStartCounting.bind(this);
  }

  handleDone() {
    let audio = new Audio('assets/definite.mp3');
    audio.play();
    
    this.setState({counting: false});

    if (this.state.isBreak) return; //Only count WORK periods not BREAKS

    if (this.state.numberOfDone < 3) {
      this.setState({
	numberOfDone: this.state.numberOfDone+1,
        firstTime: false
      });
    } else {
      this.setState({
	numberOfDone: 0,
        total: this.state.total+1
      });
    }
  }

  handleTotal() {
    this.setState({total: this.state.total+1});
    this.setState({numberOfDone: 0});
  }
  
  handleStartCounting(isBreak) {
    this.setState({counting: true, isBreak: isBreak});
  }
  
  topElement(counting) {
    let seconds = this.state.isBreak ? this.BREAK_TIME : this.WORK_TIME;
    let topElement;
    if (counting){
      topElement = <Countdown  
	seconds={seconds*60}
	onDone={this.handleDone} 
      />
    }else{
      topElement = <CountingDialogue 
	onStartCounting = {this.handleStartCounting} 
        workTime = {this.WORK_TIME}
        breakTime = {this.BREAK_TIME}
	firstTime = {this.state.firstTime}
      />;

    }
    return topElement;
  }
  
  render() {

    return (
      <div id="pomodoro">
        <div className="top">
          {this.topElement(this.state.counting)}
	</div>
        <div className="bottom">
          <Progress numberOfDone={this.state.numberOfDone}/>  
          <Total 
	    numberOfDone={this.state.numberOfDone} 
            onDone={this.handleDone}
            total={this.state.total}
            onTotal={this.handleTotal}
          />  
        </div>
      </div>
    );
  }
}

export default Pomodoro;
