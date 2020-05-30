import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './index.scss';
import user from '../stores/User';
import LoginInvite from '../loginInvite';
import Pomodoros from '../stores/Pomodoros'

const History = observer(class History extends Component {
  constructor(props) {
    super(props);
    Pomodoros.fetch()
  }

  refreshData() {
    if (this.state.IsDataAvailable) return false;
    this.fetchData().then(
      (res) => {
        if (res.status === 200) {
          this.setState(
            {
              IsDataAvailable: true,
              remoteData: res.data,
            },
          );
        } else {
          console.log(res);
        }
      },
    );
  }

  renderTitle(){
    return (
      <thead>
        <tr>
          <td className='title'>ID</td>
          <td className='title'>Project Name</td>
          <td className='title'>Time</td>
        </tr>
      </thead>
    )
  }

  renderTable() {
    return (
      <table>
        { this.renderTitle() }
        <tbody>
          { Pomodoros.list.map(
            (pomodoro) =>
              <tr key={pomodoro.id}>
                <td>{pomodoro.id}</td>
                <td>{pomodoro.projectName}</td>
                <td>{pomodoro.date}</td>
              </tr>
          )}
        </tbody>
      </table>
    )
  }

  render() {
    if (!user.isLogin) return <LoginInvite/>

   return (
      <div id="history">
        { Pomodoros.loading ?
          'loading data...' :
          this.renderTable()
        }
      </div>
    )
  }
});

export default History;
