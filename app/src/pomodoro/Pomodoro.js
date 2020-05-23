import React, { Component } from 'react';
import './Pomodoro.scss';
import Countdown from './Countdown';
import Progress from './Progress';
import Total from './Total';
import CountingDialogue from './CountingDialogue';
import user from '../stores/User'
import pomodoros from '../stores/Pomodoros'
import { workTimeDuration, breakTimeDuration } from '../config/Vars';

class Pomodoro extends Component{
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

  async save(projectId){
    pomodoros.add(projectId)
  }

  playSound() {
    let audio = new Audio('assets/definite.mp3');
    audio.play();
  }

  handleDone(projectId) {
    this.playSound();
    if (user.isLogin) this.save(projectId);

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
    this.playSound();
    this.setState({counting: true, isBreak: isBreak});
  }

  topElement() {
    const seconds = this.state.isBreak ? breakTimeDuration : workTimeDuration
    if (this.state.counting){
      return (
        <Countdown
          seconds={seconds*60}
          onDone={this.handleDone}
        />
      )
    }

    return (
      <CountingDialogue
        onStartCounting = {this.handleStartCounting}
        workTime = {workTimeDuration}
        breakTime = {breakTimeDuration}
        firstTime = {this.state.firstTime}
      />
    )
  }

  render() {
    return (
      <div id="pomodoro">
        <div className="top">
          {this.topElement()}
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
