import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGIDcuEd5u-7yNx9XsUuWzm_CnsGFJ_ig';
  let userIsNew = true;
  if (!isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGIDcuEd5u-7yNx9XsUuWzm_CnsGFJ_ig';
    userIsNew = false;
  }
  axios.post(url, authData)
    .then((response) => {
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
      if (userIsNew) {
        axios.post('https://react-o.firebaseio.com/userData.json', {
          displayName: '',
          bio: '',
          userId: response.data.localId,
        });
      }
    })
    .catch((err) => {
      // console.log(err.response);
      dispatch(authFail(err.response.data.error));
      userIsNew = false;
    });
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate >= new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    } else {
      dispatch(logout());
    }
  }
};
