import { USER_DELETED, USER_POST, USER_UPDATED } from "./type";
const token = localStorage.get("key");

const baseURL = "http://localhost:8080/users";

export const userUpdate = (form) => (dispatch) => {
  dispatch({ type: "LOADING_TRUE", payload: "" });
  fetch(`${baseURL}/${form._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: USER_UPDATED, payload: res });
      dispatch({ type: "LOADING_FALSE", payload: "" });
    })
    .catch((error) => {
      dispatch({ type: "LOADING_FALSE", payload: "" });
      alert("internal server issue, Update it letter");
      console.log(error);
    });
};

export const userDelete = (id) => (dispatch) => {
  dispatch({ type: "LOADING_TRUE", payload: "" });
  fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: USER_DELETED, payload: res });
      dispatch({ type: "LOADING_FALSE", payload: "" });
    })
    .catch((error) => {
      dispatch({ type: "LOADING_FALSE", payload: "" });
      alert("internal server issue, Delete it letter");
      console.log(error);
    });
};
export const userPost = (form) => (dispatch) => {
  dispatch({ type: "LOADING_TRUE", payload: "" });
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
      dispatch({ type: "LOADING_FALSE", payload: "" });
    })
    .catch((error) => {
      dispatch({ type: "LOADING_FALSE", payload: "" });
      alert("internal server issue, Add user letter");
      console.log(error);
    });
};

// export const userGet = () => (dispatch) => {
//   dispatch({ type: "LOADING_TRUE", payload: "" });
//   fetch(`${baseURL}`, {
//     method: "GET",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${token}`, // notice the Bearer before your token
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       dispatch({ type: USER_POST, payload: res });
//       dispatch({ type: "LOADING_FALSE", payload: "" });
//     })
//     .catch((error) => {
//       dispatch({ type: "LOADING_FALSE", payload: "" });
//       alert("internal server issue, Add user letter");
//       console.log(error);
//     });
// };
