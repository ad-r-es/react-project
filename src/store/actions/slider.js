import * as actionTypes from './actionTypes';

export const fetchDataSuccess = (factCount, responseData) => ({
  type: actionTypes.FETCH_DATA_SUCCESS,
  factCount,
  responseData,
});

export const fetchData = () => ({
  type: actionTypes.FETCH_DATA,
});

export const displayData = (slide) => ({
  type: actionTypes.DISPLAY_DATA,
  slide,
});
