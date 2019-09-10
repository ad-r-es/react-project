import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/profile';

export function* loadProfileSaga(action) {
  const queryParams = yield `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const response = yield axios.get(`https://react-o.firebaseio.com/userData.json${queryParams}`)
    const key = yield Object.keys(response.data)[0];
    yield put(
      actions.loadProfileSuccess(
        response.data[key].displayName,
        response.data[key].bio,
        key
      )
    )
  } catch (err) {

  }
};
