import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  authCheckStateSaga,
} from './auth';
import { loadProfileSaga } from './profile';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH, authSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchProfile() {
  yield takeEvery(actionTypes.PROFILE_LOAD, loadProfileSaga)
}
