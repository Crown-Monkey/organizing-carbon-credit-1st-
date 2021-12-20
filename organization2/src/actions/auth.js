import axiosInstance from "../helpers/axios";
import axios from "../helpers/axios";
import { authConstants, userConstants } from "./constants";

export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post("/signin", {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "Error failed to retreive!...",
        },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) =>{
    dispatch({ type: authConstants.LOGOUT_REQUEST});
    const res = await axios.post("/signout", {headers: axiosInstance.headers});
    if(res.status === 200){
      localStorage.clear();
      dispatch({type: authConstants.LOGOUT_SUCCESS});

    } else{
      // console.log(res.data.error);
      dispatch({ type: authConstants.LOGOUT_FAILURE,
                payload: {error: res.data.error},
      });
    
    }
  }; 
};