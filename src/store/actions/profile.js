import * as actionTypes from './actionTypes';

export const loadProfileSuccess = (displayName, bio, userDataKey) => ({
  type: actionTypes.PROFILE_LOAD_SUCCESS,
  displayName,
  bio,
  userDataKey,
});

export const loadProfile = (token, userId) => ({
  type: actionTypes.PROFILE_LOAD,
  token,
  userId,
});
