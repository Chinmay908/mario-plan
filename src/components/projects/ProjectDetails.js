import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, withRouter } from "react-router-dom";
import moment from "moment";
import { deleteProject } from "../../store/actions/projectActions";

class ProjectDetails extends Component {
  handleDelete = () => {
    this.props.deleteProject(this.props.projectId);
    this.props.history.push("/");
  };
  handleEdit = () => {
    this.props.history.push("/create", {state:this.props.projectId});
  }

  render() {
    console.log(this.props.project);
    const { project, auth } = this.props;
    console.log(this.props);
    if (!auth.uid) return <Redirect to="/signin" />;
    if (project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">{project.title}</span>
              <p>{project.content}</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Posted By {project.authorFirstName} {project.authorLastName}
              </div>
              <div>{moment(project.createdAt.toDate()).format("lll")}</div>
              {auth.uid === project.authorId ? (
                <button
                  class="btn pink lighten-1 z-depth-0"
                  onClick={this.handleDelete}
                  style={{ marginTop: "30px", marginRight: "20px" }}
                >
                  Delete
                </button>
              ) : null}

              {auth.uid === project.authorId ? (
                <button
                  class="btn pink lighten-1 z-depth-0"
                  onClick={this.handleEdit}
                  style={{ marginTop: "30px" }}
                >
                  Edit
                </button>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading Project...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth,
    projectId: id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
    // editProject: (project) => dispatch(editProject(project)),
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "projects" }])
  )(ProjectDetails)
);
