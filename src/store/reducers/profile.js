import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  displayName: '',
  bio: '',
  userDataKey: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_LOAD_SUCCESS:
      return updateObject(state, {
        displayName: action.displayName,
        bio: action.bio,
        userDataKey: action.userDataKey,
      });
    case actionTypes.PROFILE_LOAD_FAIL:
      return updateObject(state, { error: action.error });
    case actionTypes.PROFILE_UPDATE_SUCCESS:
      return updateObject(state, {
        displayName: action.displayName,
        bio: action.bio,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        displayName: '',
        bio: '',
        userDataKey: null,
      });
    default:
      return state;
  }
};

export default profileReducer;
