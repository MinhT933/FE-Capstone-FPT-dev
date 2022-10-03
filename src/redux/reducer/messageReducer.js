import * as PathAction from "../PathAction";

const initialState = {};

export default function MessageReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PathAction.SET_MESSAGE:
      return { message: payload };

    case PathAction.CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}
