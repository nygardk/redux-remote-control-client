import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Demo from './Demo';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <Demo />
  </Provider>
), document.querySelector('#content'));
