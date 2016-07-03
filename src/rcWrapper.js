import React from 'react';
import { Provider } from 'react-redux';

import ControlPanel from './components/ControlPanel';
import configureStore from './configureStore';

const store = configureStore();

export default function rcWrapper(children) {
  return (
    <div>
      <Provider store={store}>
        <ControlPanel />
      </Provider>

      <div style={{ paddingTop: 120 }}>
        {children}
      </div>
    </div>
  );
}
