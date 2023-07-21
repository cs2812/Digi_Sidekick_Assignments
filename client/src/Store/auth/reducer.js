const InitialState={
    loading:false,
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
        default:{
            return state;
        }
    }
}