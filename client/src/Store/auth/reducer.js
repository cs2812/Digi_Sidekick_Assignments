const InitialState={
    loading:false,
    addLoading:false,
    isAuth:localStorage.getItem("key")|| false,
    token:localStorage.getItem("key")||"",
}

export const authReducer=(state=InitialState,{type,payload})=>{
    switch(type){
        case "USER_LOGIN_SUCCESS": {
            return {
              ...state,
              isAuth: true,
              token:localStorage.getItem("key")
            };
          }
          case "USER_LOGOUT_SUCCESS": {
            localStorage.removeItem("key");
            return {
              ...state,
              isAuth: false,
            //   token:""
            };
          }
          case "LOADING_TRUE": {
            return {
              ...state,
              loading: true,
            };
          }
          case "LOADING_FALSE": {
            return {
              ...state,
              loading: false,
            };
          }
          case "ADD_LOADING_TRUE": {
            return {
              ...state,
              addLoading: true,
            };
          }
          case "ADD_LOADING_FALSE": {
            return {
              ...state,
              addLoading: false,
            };
          }
        default:{
            return state;
        }
    }
}