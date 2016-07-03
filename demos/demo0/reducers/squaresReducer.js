const INITIAL_STATE = {
  activeSquares: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SQUARE_ACTIVATE':
      return {
        ...state,
        activeSquares: !state.activeSquares.includes(action.square)
          ? [...state.activeSquares, action.square]
          : state.activeSquares,
      };

    case 'SQUARE_DEACTIVATE':
      return {
        ...state,
        activeSquares: state.activeSquares.includes(action.square)
          ? state.activeSquares.filter(s => s !== action.square)
          : state.activeSquares,
      };

    default:
      return state;
  }
}
