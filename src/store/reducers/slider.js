import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  factCount: 0,
  slide: '',
  responseData: null,
};

const sliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_SUCCESS:
      return updateObject(state, {
        factCount: action.factCount,
        responseData: action.responseData,
      });
    case actionTypes.DISPLAY_DATA:
      return updateObject(state, { slide: action.slide });
    default:
      return state;
  }
};

export default sliderReducer;
