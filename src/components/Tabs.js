import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import './Tabs.styl';

const TabPanel = props => (
  <div className="RC_TabPanel" {...props}>
    {props.children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 0,
    };
  }

  componentWillReceiveProps(props) {
    if (props.children && this.state.activeTabIndex >= props.children.length) {
      this.setState({
        activeTabIndex: 0,
      });
    }
  }

  render() {
    const {
      children,
      className,
    } = this.props;

    const {
      activeTabIndex,
    } = this.state;

    const classes = cx('RC_Tabs', className);

    return (
      <div className={classes}>
        <div className="RC_TabsList">
          {React.Children.map(children, (child, index) => {
            const tabsClasses = cx('RC_Tab', {
              'RC_Tab--active': activeTabIndex === index,
              'RC_Tab--inactive': activeTabIndex !== index,
            });

            return (
              <div className={tabsClasses}
                onClick={() => this.setState({ activeTabIndex: index })}>
                {child.props.title}
              </div>
            );
          })}
        </div>

        {React.Children.map(children, (child, index) => {
          if (child === null) {
            return null;
          }

          if (child.type !== TabPanel) {
            throw new Error('Invalid child element given for Tabs. Must be a TabPanel.');
          }

          return React.cloneElement(child, {
            className: cx('RC_TabPanel', child.props.className, {
              'RC_TabPanel--active': activeTabIndex === index,
              'RC_TabPanel--inactive': activeTabIndex !== index,
            }),
          });
        })}
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { TabPanel };

export default Tabs;
