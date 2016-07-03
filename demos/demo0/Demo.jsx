import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import times from 'lodash.times';

import Square from './components/Square';
import {
  activateSquare,
  deactivateSquare,
} from './actions/squares';

const SQUARE_COUNT = 9;

const Demo = props => {
  const {
    activeSquares,
    dispatch,
  } = props;

  const style = {
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'center',
    justifyContent: 'space-around',
  };

  return (
    <div style={style}>
      {times(SQUARE_COUNT).map(index => {
        const isActive = activeSquares.includes(index);
        const onClick = isActive
          ? () => dispatch(deactivateSquare(index))
          : () => dispatch(activateSquare(index));

        return (
          <Square key={index}
            style={{ margin: '10px' }}
            isActive={isActive}
            onClick={onClick}>
            {index + 1}
          </Square>
        );
      })}
    </div>
  );
};

Demo.propTypes = {
  activeSquares: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  activeSquares: state.squares.activeSquares,
}))(Demo);
