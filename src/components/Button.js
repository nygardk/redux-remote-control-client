import React, { PropTypes } from 'react';
import cx from 'classnames';

import './Button.styl';

const Button = props => (
  <button {...props} className={cx('RC_Button', props.className)} />
);

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
