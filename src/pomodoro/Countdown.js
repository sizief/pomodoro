import React, { Component } from 'react';
import './Countdown.scss';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.seconds,
      counting: true,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (!this.state.counting) return;

    if (this.state.timer > 0) {
      this.setState({ timer: this.state.timer - 1 });
    } else {
      this.props.onDone();
    }
  }

  counter() {
    return (
      `${Math.floor(this.state.timer / 60)}:${this.state.timer % 60}`
    );
  }

  pause() {
    this.setState({ counting: !this.state.counting });
  }

  restart() {
    this.setState({ timer: this.props.seconds });
  }

  controls() {
    const phrase = this.state.counting ? 'Pause' : 'Resume';
    return (
      <div className="control">
        <span onClick={this.restart.bind(this)}>Restart | </span>
        <span onClick={this.pause.bind(this)}>{phrase}</span>
      </div>
    );
  }

  render() {
    return (
      <div id="countdown">
        <div className="number">{this.counter()}</div>
        {this.controls()}
      </div>
    );
  }
}

export default Countdown;
