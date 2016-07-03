export function activateSquare(index) {
  return {
    type: 'SQUARE_ACTIVATE',
    square: index,
  };
}

export function deactivateSquare(index) {
  return {
    type: 'SQUARE_DEACTIVATE',
    square: index,
  };
}
