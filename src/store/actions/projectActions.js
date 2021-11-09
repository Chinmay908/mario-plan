import { firestore } from "../../config/fbConfig";
export const createProject = (project) => {
  return (disptach, getState) => {
    // const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("projects")
      .add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        disptach({ type: "CREATE_PROJECT", project });
      })
      .catch((err) => {
        disptach({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const deleteProject = (projectId) => {
  return (disptach) => {
    firestore
      .collection("projects")
      .doc(projectId)
      .delete()
      .then(() => {
        disptach({ type: "DELETE_PROJECT", projectId });
      })
      .catch((err) => {
        disptach({ type: "DELETE_PROJECT_ERROR", err });
      });
  };
};

export const editProject = (project, id) => {
  return (disptach) => {
    firestore
      .collection("projects")
      .doc(id)
      .update({
        ...project, //title and content
        createdAt: new Date(),
      })
      .then(() => {
        disptach({ type: "EDIT_PROJECT" });
      })
      .catch((err) => {
        disptach({ type: "EDIT_PROJECT_ERROR", err });
      });
  };
};
