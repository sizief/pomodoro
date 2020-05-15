import React, { Component } from 'react';
import './index.scss';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import user from '../stores/User';
import LoginInvite from '../loginInvite';
import { apiEndpoint } from '../config/Vars';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsDataAvailable: false,
    };
    this.fetchData = this.fetchData.bind(this);
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

  async fetchData() {
    try {
      const response = await axios({
        method: 'get',
        url: `${apiEndpoint}/pomodoros`,
        headers: { Authorization: user.accessId },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  renderBar() {
    return (
      <ResponsiveBar
        data={this.state.remoteData.pomodoros}
        keys={this.state.remoteData.projects}
        indexBy="completed_at"
        margin={{
          top: 50, right: 130, bottom: 50, left: 60,
        }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'completed_at',
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

  render() {
    if (!user.isLogin) return <LoginInvite/>

    this.refreshData();
    return (
      <div id="history">
        { this.state.IsDataAvailable ?
          <div id="chart">{this.renderBar()}</div> :
          'Please wait'
        }
      </div>
    )
  }
}

export default History;
