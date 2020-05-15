import React, { Component } from 'react';
import projects from '../stores/Projects';
import './ProjectDropDown.scss';

class ProjectDropDown extends Component {
  constructor(props) {
    super(props);
    projects.fetch();
  }

  render() {
    if (projects.list.length === 0) return 'General'

    return (
      <select id="projectDropDown">
        { projects.list.map(
           (project) =>
              <option key={project.id}>{project.name}</option>
           )
        }
      </select>
    )
  }
}

export default ProjectDropDown;
