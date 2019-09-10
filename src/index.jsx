import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';
import App from './App';

import authReducer from './store/reducers/auth';
import profileReducer from './store/reducers/profile';
import { watchAuth, watchProfile } from './store/sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProfile);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
