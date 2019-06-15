import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { GET_ERRORS, USER_LOADING, SET_USER } from './types';
import setAuthToken from '../../utils/setAuthToken';

export const setUser = userData => ({
  type: SET_USER,
  payload: userData,
});

export const setUserLoading = () => ({
  type: USER_LOADING,
});

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/auth/register', userData)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      // TODO: loginUser
      history.push('/login');
    }).catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/auth/login', userData)
    .then((res) => {
      const { token } = res.data;

      // Save token into browser local storage
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);

      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));

      history.push('/');
    }).catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false); // Removes the token
  dispatch(setUser({}));
};
