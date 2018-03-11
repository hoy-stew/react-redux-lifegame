export const initialize = (size) => {
  return {
    type: 'LIFEGAME_INIT',
    payload: {
      size: size,
    }
  }
}

export const next = () => {
  return {
    type: 'LIFEGAME_NEXT',
  }
}

export const setStatus = (x, y, status) => {
  return {
    type: 'LIFEGAME_SET_STATUS',
    payload: {
      x: x,
      y: y,
      status: status,
    }
  }
}