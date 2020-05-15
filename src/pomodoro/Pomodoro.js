import React, { Component } from 'react';
import './Pomodoro.scss';
import Countdown from './Countdown';
import Progress from './Progress';
import Total from './Total';
import CountingDialogue from './CountingDialogue';
import UserContext from '../context/UserContext'
import axios from 'axios';
import moment from 'moment';
import { apiEndpoint } from '../config/Vars';

class Pomodoro extends Component{
  static contextType = UserContext
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

  async save(){
    try{
      await axios({
        method: 'post',
        url: `${apiEndpoint}/pomodoros`,
        data: JSON.stringify(
          {
            project_id: 'default',
            completed_at: moment().format("YYYY-MM-DD")
          }
        ),
        headers: {'Authorization': this.context.accessId}
      });
    } catch(error){
      //TODO: try again
    }
  }

  playSound() {
    let audio = new Audio('assets/definite.mp3');
    audio.play();
  }

  handleDone() {
    this.playSound();
    if (this.context.loggedIn) this.save();

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
    const seconds = this.state.isBreak ? this.BREAK_TIME : this.WORK_TIME;
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
        workTime = {this.WORK_TIME}
        breakTime = {this.BREAK_TIME}
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
