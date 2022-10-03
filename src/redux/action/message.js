import * as PathAction from "./../PathAction";

export const setMessage = (message) => ({
  type: PathAction.SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: PathAction.CLEAR_MESSAGE,
});
