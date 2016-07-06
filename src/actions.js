import WS from './WS';

export function startSharing() {
  return dispatch => {
    dispatch({ type: 'CONNECTION_START' });

    WS.openConnection().then(connectionId => {
      dispatch({
        type: 'CONNECTION_ESTABLISHED',
        connectionId,
      });
    }, () => {
      dispatch({ type: 'CONNECTION_ESTABLISHATION_ERROR' });
    });
  };
}

export function stopSharing() {
  return dispatch => {
    WS.closeConnection().then(() => dispatch({ type: 'CONNECTION_CLOSED' }));
  };
}
