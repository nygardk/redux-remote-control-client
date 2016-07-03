import React from 'react';
import times from 'lodash.times';

import Square from './components/Square';

const SQUARE_COUNT = 9;

const Demo = () => {
  const style = {
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'center',
    justifyContent: 'space-around',
  };

  return (
    <div style={style}>
      {times(SQUARE_COUNT).map(index => (
        <Square key={index} style={{ margin: '10px' }}>
          {index + 1}
        </Square>
      ))}
    </div>
  );
};

export default Demo;
