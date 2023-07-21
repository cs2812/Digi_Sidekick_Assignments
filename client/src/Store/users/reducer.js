import { USER_DELETED, USER_GET, USER_POST, USER_UPDATED } from "./type";
const InitialState = {
  usersData: [],
};

export const userReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case USER_POST: {
        state.usersData.unshift(payload.data)
        return { ...state };
      }
    case USER_UPDATED: {
      state.usersData = state.usersData.map(
        (ele, i) => ele._id===payload._id?payload:ele
      );
      return { ...state };
    }
    case USER_DELETED: {
      state.usersData = state.usersData.filter(
        (ele, i) => ele._id !== payload
      );
      return { ...state };
    }
    case USER_GET: {
      return { ...state, usersData: payload.data };
    }
    default: {
      return state;
    }
  }
};
