import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/slider';

function* fetchDataSaga() {
  const response = yield axios.get('https://react-o.firebaseio.com/slides.json');
  yield put(actions.fetchDataSuccess(
    response.data.length,
    response.data,
  ));
}

export default fetchDataSaga;
