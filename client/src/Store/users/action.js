import axios from "axios"
import { USER_UPDATED } from "./type"

const baseURL = "http://localhost:8080/users"

export const useUpdate=(form)=>(dispatch)=>{
    dispatch({ type: "LOADING_TRUE", payload: "" });
    axios.put(baseURL,form)
    .then((res)=>{
        dispatch({type:USER_UPDATED,payload:res.data})
        dispatch({ type: "LOADING_FALSE", payload: "" });
    })
    .catch((error)=>{
        dispatch({ type: "LOADING_FALSE", payload: "" });
        alert("internal server issue, Update it letter")
        console.log(error)
    })

}