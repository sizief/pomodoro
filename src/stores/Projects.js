import { observable, decorate, action, computed } from "mobx";
import { apiEndpoint } from '../config/Vars';
import user from './User'
import axios from 'axios';
import Project from './models/project'

class Projects {
  list = []
  userProject = user

  async fetchProjects() {
    const response = await axios({
      method: 'get',
      url: `${apiEndpoint}/projects`,
      headers: { Authorization: user.accessId },
    })

    this.list = response.data.map(projectData => new Project(projectData))
  }

  async addProject(name) {
    try {
      const response = await axios({
        method: 'post',
        url: `${apiEndpoint}/projects`,
        headers: { Authorization: user.accessId },
        data: {
          name: name
        }
      })
    } catch (error){
      console.log(error)
    }
  }

  fetch(){
    this.fetchProjects()
  }

  add(name) {
    this.addProject(name)
    this.fetchProjects()
  }
}

decorate(Projects, {
  list: observable,
  add: action
})

const projects = new Projects()
export default projects
