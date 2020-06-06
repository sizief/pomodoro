import React, { Component } from 'react';
import './Pomodoro.scss';
import Countdown from './Countdown';
import Total from './Total';
import CountingDialogue from './CountingDialogue';
import user from '../stores/User'
import pomodoros from '../stores/Pomodoros'
import { workTimeDuration, breakTimeDuration } from '../config/Vars';

class Pomodoro extends Component{
  constructor(props){
    super();
    this.state = {
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
    this.setState({counting: false});
    if (this.state.isBreak) return; //Only count WORK periods not BREAKS
    if (user.isLogin) this.save(projectId);
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
      </div>
    );
  }
}

export default Pomodoro;
