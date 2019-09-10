import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  authCheckStateSaga,
} from './auth';
import { loadProfileSaga, updateProfileSaga } from './profile';
import fetchDataSaga from './slider';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH, authSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchProfile() {
  yield takeEvery(actionTypes.PROFILE_LOAD, loadProfileSaga);
  yield takeEvery(actionTypes.PROFILE_UPDATE, updateProfileSaga);
}

export function* watchSlider() {
  yield takeEvery(actionTypes.FETCH_DATA, fetchDataSaga);
}
