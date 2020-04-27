import React, { Component } from 'react';
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import './index.scss';
import axios from 'axios';
import projects from '../stores/Projects';

const Project = observer(class Project extends Component {
  constructor(props) {
    super(props);
    projects.fetch()
  }

  addProject() {
    return (
      <form onSubmit={this.handleSubmit}>
         <label>
           Name:
           <input type="text"/>
         </label>
         <input type="submit" value="Submit" />
      </form>
    )
  }

  handleSubmit(event) {
    projects.add(event.target[0].value)
    event.target[0].value = ''
    event.preventDefault();
  }

  render() {
    return (
      <div id="project">
        <div>
          { this.addProject() }
        </div>
        <div>
          <ul>
          { projects.list.map( project => <li key={project.id}>{project.name}</li>) }
         </ul>
        </div>
      </div>
    );
  }
}
)
export default Project
