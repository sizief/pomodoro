import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Pomodoro from './pomodoro/Pomodoro';
import History from './history';
import Project from './project';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Pomodoro} />
        <Route path="/pomodoro/" component={Pomodoro} />
        <Route path="/history" component={History} />
        <Route path="/project" component={Project} />
      </Switch>
    );
  }
}

export default AppRouter;
