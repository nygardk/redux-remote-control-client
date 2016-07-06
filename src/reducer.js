const INITIAL_STATE = {
  connectionActive: false,
  connectionId: undefined,
  isConnecting: false,
};

export default function controlPanelReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CONNECTION_START':
      return {
        ...state,
        isConnecting: true,
      };

    case 'CONNECTION_ESTABLISHED':
      return {
        ...state,
        isConnecting: false,
        connectionActive: true,
        connectionId: action.connectionId,
      };

    case 'CONNECTION_ESTABLISHATION_ERROR':
      return {
        ...state,
        isConnecting: false,
        connectionActive: false,
      };

    case 'CONNECTION_CLOSED':
      return {
        ...state,
        connectionActive: false,
        connectionId: undefined,
      };

    default:
      return state;
  }
}
