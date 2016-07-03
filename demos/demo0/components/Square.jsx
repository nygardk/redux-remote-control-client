import React, { PropTypes } from 'react';

const Square = props => {
  const {
    children,
    isActive,
  } = props;

  const style = {
    display: 'flex',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: isActive ? 'white' : 'lightgrey',
    color: isActive ? 'black' : 'grey',
    border: isActive && '1px solid black',

    ...props.style,
  };

  return (
    <div className="Square" style={style}>
      {children}
    </div>
  );
};

Square.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  style: PropTypes.object,
};

export default Square;
