import React from 'react';
import Tabs, { TabPanel } from './Tabs';

import Button from './Button';
import './ControlPanel.styl';

const ControlPanel = () => {
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
          <Button>
            Start sharing
          </Button>
        </TabPanel>

        <TabPanel title="Connect">
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

export default ControlPanel;
