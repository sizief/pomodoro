import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './index.scss';
import { ResponsiveBar } from '@nivo/bar';
import user from '../stores/User';
import LoginInvite from '../loginInvite';
import Pomodoros from '../stores/Pomodoros'
import axios from 'axios';
import { apiEndpoint} from '../config/Vars';

const History = observer(class History extends Component {
  constructor(props) {
    super(props);
    if (user.isLogin) Pomodoros.fetch();
    this.state = { dataAvailable: false, remoteData: null }
  }

  async fetchPomodorosGropued(){
    const response = await axios({
      method: 'get',
      url: `${apiEndpoint}/pomodoros_grouped`,
      headers: { Authorization: user.accessId },
    })

    if (response.status != 200) {
      console.log(response);
      return
    }

    this.setState({
      dataAvailable: true,
      remoteData: response.data
    })
  }

  renderBar() {
    if (!this.state.dataAvailable) {
      this.fetchPomodorosGropued()
      return
    }

    return (
      <ResponsiveBar
        data={this.state.remoteData.pomodoros}
        keys={this.state.remoteData.projects}
        indexBy="created_at"
        margin={{
          top: 50, right: 130, bottom: 70, left: 60,
        }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 45,
          //legend: 'date',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'pomodoro',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate
        motionStiffness={90}
        motionDamping={15}
      />
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
          <>
            <div id="chart">{this.renderBar()}</div>
            {this.renderTable()}
          </>
        }
      </div>
    )
  }
});

export default History;
