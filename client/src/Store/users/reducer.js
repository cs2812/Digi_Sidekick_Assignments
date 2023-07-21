import { USER_DELETED, USER_GET, USER_SINGLE, USER_UPDATED } from "./type";
const InitialState = {
  usersData: [],
  user: {},
};

export const userReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case USER_UPDATED: {
      state.usersData = state.usersData.map(
        (ele, i) => ele._id===payload.data._id?payload.data:ele
      );
      return { ...state };
    }
    case USER_DELETED: {
      state.usersData = state.usersData.filter(
        (ele, i) => ele._id !== payload.data._id
      );
      return { ...state };
    }
    case USER_GET: {
      return { ...state, usersData: payload.data };
    }
    case USER_SINGLE: {
      return { ...state, user: payload.data };
    }
    default: {
      return state;
    }
  }
};
