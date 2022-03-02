import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject, editProject } from "../../store/actions/projectActions";
import { Redirect, withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class CreateProject extends Component {
  state = {
    title: "",
    content: "",
  };

  edit = {
    setEdit: true,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push("/");
  };

  handleEditchange = (e) => {
    e.preventDefault();
    const projectId = this.props.location.state;
    console.log(projectId);
    this.props.editProject(this.state, projectId.state);
    this.props.history.push("/");
  };

  render() {
    const { auth, projects } = this.props;
    const projectId = this.props.location.state;
    if (projectId && this.edit.setEdit) {
      const project = projects ? projects[projectId.state] : null;
      // console.log(project);
      if (projectId.state) {
        this.setState({
          title: project.title,
          content: project.content,
        });
        this.edit.setEdit = false;
      }
    }
    // console.log(newProject);
    // console.log(projectId.state);
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form
          onSubmit={projectId ? this.handleEditchange : this.handleSubmit}
          className="white"
        >
          <h5 className="grey-text text-darken-3">
            {projectId ? "Edit Project" : "Create New Project"}
          </h5>
          <div className="input-field">
            <label htmlFor="title" className="active">
              Title
            </label>
            <input
              type="text"
              id="title"
              onChange={this.handleChange}
              value={this.state.title}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="content" className="active">
              Project Content
            </label>
            <textarea
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
              value={this.state.content}
              required
            ></textarea>
          </div>
          <div className="input-field">
            <button
              className="btn pink lighten-1 z-depth-0"
              style={{ marginRight: "20px" }}
            >
              {projectId ? "save" : "create"}
            </button>
            <button
              className="btn pink lighten-1 z-depth-0"
              onClick={() => this.props.history.push("/")}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const projects = state.firestore.data.projects;
  return {
    auth: state.firebase.auth,
    projects: projects,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    editProject: (project, id) => dispatch(editProject(project, id)),
  };
};
export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "projects" }])
  )(CreateProject)
);
