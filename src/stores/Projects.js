import { observable, decorate, action } from "mobx";
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
      await axios({
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

  async removeProject(id) {
    try {
      await axios({
        method: 'delete',
        url: `${apiEndpoint}/projects/${id}`,
        headers: { Authorization: user.accessId },
      })
    } catch (error){
      console.log(error)
    }
  }

  fetch(){
    this.fetchProjects()
  }

  async add(name) {
    await this.addProject(name)
    this.fetch()
  }

  remove(id) {
    // Education tip: you can wait for fulfiled by await or then
    this.removeProject(id)
    .then(() => this.fetch())
  }
}

decorate(Projects, {
  list: observable,
  add: action,
  remove: action
})

const projects = new Projects()
export default projects
