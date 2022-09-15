import { USER_ACTION_TYPES as types } from "./user.types";
import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase-utils";
import { signInFailed, signOutFailed, signUpFailed, signOutSuccess, signInSuccess } from "./user.action";

export type UserState = {
  readonly currentUser : UserData | null;
  readonly isLoading: boolean,
  readonly error: Error | null
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action : AnyAction) => {
  if(signInSuccess.match(action)) {
    return {...state, currentUser: action.payload}
  }

  if(signOutSuccess.match(action)) {
    return { ...state, currentUser: null}
  }

  if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
    return { ...state, error: action.payload}
  }
  
  return state;

  // const { type, payload } = action;
  // switch (type) {
  //   case types.SIGN_IN_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: payload,
  //     };
  //   case types.SIGN_OUT_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: null,
  //     };
  //   // stacking the error types
  //   case types.SIGN_UP_FAILED:
  //   case types.SIGN_OUT_FAILED:
  //   case types.SIGN_IN_FAILED:
  //     return {
  //       ...state,
  //       error: payload,
  //     };
  //   default:
  //     return state;
  // }
};
