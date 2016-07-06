import { combineReducers } from 'redux';
import { rcReducer } from 'redux-remote-control-client';

import squaresReducer from './squaresReducer';

const rootReducer = rcReducer(combineReducers({
  squares: squaresReducer,
}));

export default rootReducer;
