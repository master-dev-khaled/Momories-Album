import { AUTH, LOGOUT, SIGNUP, LOGIN } from '../constants/actionTypes';
import * as api from '../api/index.js'
export const authenticate = (result, token) => async (dispatch) => {
    try {
      dispatch({ type: AUTH, payload: {result, token}});
    } catch (error) {
      console.log(error);
    }
  };
  export const logout = () => async (dispatch) => {
    try {
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const signup = (formData , navigate) => async (dispatch) => {
    try {
      const { data } = await api.signup(formData)
      dispatch({ type: AUTH , data});
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  export const login = (formData , navigate) => async (dispatch) => {
    try {
      const { data } = await api.login(formData);
      dispatch({ type: AUTH, data });
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };