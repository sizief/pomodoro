import React, { Component } from 'react';
import { observer } from 'mobx-react';
import projects from '../stores/Projects';
import './index.scss';
import LoginInvite from '../loginInvite';
import user from '../stores/User';
import { defaultProjectName } from '../config/Vars';

const Project = observer(class Project extends Component {
  constructor(props) {
    super(props);
    projects.fetch();
    this.state = {
      removedProjects: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  submitButton() {
    const value = projects.loading ? '...' : 'Add'
    return (
      <input
        type="submit"
        value={value}
        className='addButton'
        disabled={projects.loading}
      />
    )
  }

  addProject() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Project Name
          <input type="text" className='addInput'/>
        </label>
        {this.submitButton()}
      </form>
    );
  }

  handleSubmit(event) {
    event.preventDefault()
    const name = event.target[0].value
    event.target[0].value = '';

    projects.add(name)
  }

  handleRemove(projectId) {
    projects.remove(projectId);
    this.setState({removedProjects: [...this.state.removedProjects, projectId]})
  }

  renderRemove(project) {
    if (project.name === defaultProjectName) return
    if (this.state.removedProjects.includes(project.id))
      return <span className='remove'>removing...</span>

    return (
      <span
        className='remove'
        onClick={() => this.handleRemove(project.id)}
      >
        remove
      </span>
    )
  }

  render() {
    if (!user.isLogin) return <LoginInvite/>

    return (
      <div id="project">
        <div id='main'>
          { this.addProject() }
        </div>
        <div id='list'>
          <ul>
            { projects.list.map(
              (project) => 
                <li key={project.id}>{project.name}
                  { this.renderRemove(project) }
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
});
export default Project;
