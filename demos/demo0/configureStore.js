import { createStore, applyMiddleware } from 'redux';
import { syncMiddleware } from 'redux-remote-control-client';

import rootReducer from './reducers';

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(syncMiddleware()));
}
