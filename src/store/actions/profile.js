import * as actionTypes from './actionTypes';

export const loadProfileSuccess = (displayName, bio, userDataKey) => ({
  type: actionTypes.PROFILE_LOAD_SUCCESS,
  displayName,
  bio,
  userDataKey,
});

export const loadProfileFail = (error) => ({
  type: actionTypes.PROFILE_LOAD_FAIL,
  error,
});

export const loadProfile = (token, userId) => ({
  type: actionTypes.PROFILE_LOAD,
  token,
  userId,
});

export const updateProfileSuccess = (displayName, bio) => ({
  type: actionTypes.PROFILE_UPDATE_SUCCESS,
  displayName,
  bio,
});

export const updateProfile = (displayName, bio, userId, userDataKey) => ({
  type: actionTypes.PROFILE_UPDATE,
  displayName,
  bio,
  userId,
  userDataKey,
});
