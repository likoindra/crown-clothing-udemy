import { USER_ACTION_TYPES as types } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    // stacking the error types
    case types.SIGN_UP_FAILED:
    case types.SIGN_OUT_FAILED:
    case types.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
