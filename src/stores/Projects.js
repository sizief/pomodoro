import { observable, decorate, action } from "mobx";
import { apiEndpoint } from '../config/Vars';
import user from './User'
import axios from 'axios';
import Project from './models/project'
import { defaultProjectName } from '../config/Vars';
import Base from './Base'

class Projects extends Base{
  list = [new Project({name: defaultProjectName, id: 0})]

  async add(name) {
    await this._addProject(name)
    this.fetch()
  }

  async remove(id) {
    await this._removeProject(id)
    this.fetch()
  }

  fetch() {
    super.request(
      async () => {
        const response = await axios({
          method: 'get',
          url: `${apiEndpoint}/projects`,
          headers: { Authorization: user.accessId },
        })

        this.list = response.data.map(projectData => new Project(projectData))
      }
    )
  }

  async _addProject(name) {
    await super.request(
      async () => {
        await axios({
          method: 'post',
          url: `${apiEndpoint}/projects`,
          headers: { Authorization: user.accessId },
          data: {
            name: name
          }
        })
      }
    )
  }

  async _removeProject(id) {
    await super.request(
      async () => {
        await axios({
          method: 'delete',
          url: `${apiEndpoint}/projects/${id}`,
          headers: { Authorization: user.accessId },
        })
      }
    )
  }

}

decorate(Projects, {
  list: observable,
  loading: observable,
  add: action,
  remove: action
})

const projects = new Projects()
export default projects
