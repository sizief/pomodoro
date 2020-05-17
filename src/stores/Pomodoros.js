import { observable, decorate } from "mobx";
import { apiEndpoint } from '../config/Vars';
import user from './User'
import axios from 'axios';
import Pomodoro from './models/Pomodoro'
import Base from './Base'

class Pomodoros extends Base {
  list = []

  async add(projectId) {
    await this._addPomodoro(projectId)
    this.fetch()
  }

  fetch() {
    super.request(
      async () => {
        const response = await axios({
          method: 'get',
          url: `${apiEndpoint}/pomodoros`,
          headers: { Authorization: user.accessId },
        })

        this.list = response.data.map(data => new Pomodoro(data))
      }
    )
  }

  async _addPomodoro(projectId){
    await super.request(
      async () => {
        await axios({
          method: 'post',
          url: `${apiEndpoint}/pomodoros`,
          data: JSON.stringify(
            {
              project_id: projectId
            }
          ),
          headers: {'Authorization': user.accessId}
        })
      }
    )
  }
}

decorate(Pomodoros, {
  list: observable,
  loading: observable,
})

const pomodoros = new Pomodoros()
export default pomodoros
