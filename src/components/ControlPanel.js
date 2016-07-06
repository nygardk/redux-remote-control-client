import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Tabs, { TabPanel } from './Tabs';
import Button from './Button';
import './ControlPanel.styl';
import {
  startSharing,
  stopSharing,
} from 'actions';

const ControlPanel = props => {
  const {
    connectionActive,
    connectionId,
    dispatch,
    isConnecting,
  } = props;

  const style = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,

    backgroundColor: '#253A58',
  };

  return (
    <div className="ControlPanel" style={style}>
      <Tabs>
        <TabPanel title="Share">
          {isConnecting && 'Connecting...'}

          {!isConnecting && !connectionActive && (
            <Button onClick={() => dispatch(startSharing())}>
              Start sharing
            </Button>
          )}

          {!isConnecting && connectionActive && (
            <div>
              <Button onClick={() => dispatch(stopSharing())}>
                Stop sharing
              </Button>

              <span style={{ marginLeft: 10 }}>
                Your ID: <strong>{connectionId}</strong>
              </span>
            </div>
          )}
        </TabPanel>

        <TabPanel title="Connect" disabled={connectionActive}>
          <label>
            <span style={{ marginRight: 10 }}>
              Connect to id
            </span>

            <input className="RC_ControlPanel__input" type="text" />
          </label>

          <Button style={{ marginLeft: 10 }}>
            connect
          </Button>
        </TabPanel>
      </Tabs>
    </div>
  );
};

ControlPanel.propTypes = {
  connectionId: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool.isRequired,
  connectionActive: PropTypes.bool.isRequired,
};

export default connect(state => ({
  ...state,
}))(ControlPanel);
