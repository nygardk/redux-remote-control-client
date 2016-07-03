import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { rcWrapper } from 'redux-remote-control-client';

import Demo from './Demo';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(rcWrapper(
  <Provider store={store}>
    <Demo />
  </Provider>
), document.querySelector('#content'));
