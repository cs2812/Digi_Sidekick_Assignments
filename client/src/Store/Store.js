import {legacy_createStore,combineReducers,applyMiddleware} from "redux"
import { authReducer } from "./auth/reducer"
import { userReducer } from "./users/reducer" 
import thunk from "redux-thunk";

const allReducer = combineReducers({
    authReducer,
    userReducer
})

export const store = legacy_createStore(allReducer,applyMiddleware(thunk))