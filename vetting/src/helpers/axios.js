import { authConstants } from "../actions/constants";
import store from "../store";
const axios = require("axios");
const { api } = require("../urlConfig");
const token = window.localStorage.getItem("token");


const axiosInstance = axios.create({
    baseURL: api,
    headers: {
       "Authorization": token ?`Access ${token}`:""
    }
}) ;

axiosInstance.interceptors.request.use((req) => {
    const {auth} = store.getState();
    if(auth.token){

        req.headers.Authorization = `Access ${auth.token}`;
    }

    return req;
})

axiosInstance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    console.log(error.response);
    if(window.status === 500){
        localStorage.clear();
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS});
    }
    return Promise.reject(error);
})

export default axiosInstance;

