import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/profile';

export function* loadProfileSaga(action) {
  const queryParams = yield `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const res = yield axios.get(`https://react-o.firebaseio.com/userData.json${queryParams}`);
    const key = yield Object.keys(res.data)[0];
    yield put(actions.loadProfileSuccess(res.data[key].displayName, res.data[key].bio, key));
  } catch (err) {
    yield put(actions.loadProfileFail(err));
  }
}

export function* updateProfileSaga(action) {
  yield axios.put(`https://react-o.firebaseio.com/userData/${action.userDataKey}.json`, {
    displayName: action.displayName,
    bio: action.bio,
    userId: action.userId,
  });
  yield put(actions.updateProfileSuccess(action.displayName, action.bio));
}
