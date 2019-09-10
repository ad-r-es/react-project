import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  displayName: '',
  bio: '',
  userDataKey: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_LOAD_SUCCESS:
      return updateObject(state, {
        displayName: action.displayName,
        bio: action.bio,
        userDataKey: action.userDataKey,
      });
    default:
      return state;
  }
};

export default profileReducer;
