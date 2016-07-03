import { combineReducers } from 'redux';

import squaresReducer from './squaresReducer';

const rootReducer = combineReducers({
  squares: squaresReducer,
});

export default rootReducer;
