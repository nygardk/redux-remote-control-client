import React, { PropTypes } from 'react';

const Square = props => {
  const {
    children,
    isActive,
    onClick,
  } = props;

  const style = {
    display: 'flex',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: isActive ? 'white' : 'lightgrey',
    color: isActive ? 'black' : 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: isActive ? 'black' : 'lightgrey',

    cursor: 'pointer',

    ...props.style,
  };

  return (
    <div className="Square" style={style} onClick={onClick}>
      {children}
    </div>
  );
};

Square.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Square;
