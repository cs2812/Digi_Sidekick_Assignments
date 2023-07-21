import { USER_DELETED, USER_POST, USER_UPDATED } from "./type";
const token = localStorage.getItem("key");

const baseURL = "http://localhost:8080/users";

export const userUpdate = (form) => (dispatch) => {
  fetch(`${baseURL}/${form._id}`, {
    method: "PUT",
    body: JSON.stringify(form),
    headers: {
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: USER_UPDATED, payload: res.data });
    })
    .catch((error) => {
      alert("internal server issue, Update it letter");
      console.log({error});
    });
};

export const userDelete = (id) => (dispatch) => {
  fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: USER_DELETED, payload: id });
    })
    .catch((error) => {
      alert("internal server issue, Delete it letter");
      console.log(error);
    });
};
export const userPost = (form) => (dispatch) => {
  dispatch({ type: "ADD_LOADING_TRUE" });
  fetch(`${baseURL}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: USER_POST, payload: res });
      dispatch({ type: "ADD_LOADING_FALSE" });
    })
    .catch((error) => {
      dispatch({ type: "ADD_LOADING_FALSE" });
      alert("internal server issue, Add user letter");
      console.log(error);
    });
};
