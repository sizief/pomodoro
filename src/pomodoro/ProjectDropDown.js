import React, { Component } from 'react';
import projects from '../stores/Projects';
import './ProjectDropDown.scss';

class ProjectDropDown extends Component {
  constructor(props) {
    super(props);
    projects.fetch();
  }

  componentDidMount(){
    this.props.onChange(projects.list[0].id)
  }

  render() {
    if (projects.list.length === 0) return 'General'

    return (
      <select id="projectDropDown" onChange={(event) => this.props.onChange(event.target.value)}>
        { projects.list.map(
           (project) =>
              <option key={project.id} value={project.id}>{project.name}</option>
           )
        }
      </select>
    )
  }
}

export default ProjectDropDown;
