import { USER_ACTION_TYPES as types } from './user.types' 
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => createAction(types.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(types.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(types.GOOGLE_SIGN_IN_START);

// emailSignInStart memiliki 2 parameter email dan password , 
// memberikan payload email & password 
export const emailSignInStart = (email, password) => createAction(types.EMAIL_SIGN_IN_START, {email,password});

export const signInSuccess = (user) => createAction(types.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => createAction(types.SIGN_IN_FAILED, error); 

export const signUpStart = (email, password, displayName ) => createAction(types.SIGN_UP_START, { email, password, displayName})

export const signUpSuccess = (user, additionalDetails) => createAction(types.SIGN_IN_SUCCESS, { user, additionalDetails });

export const signUpFailed = (error) => createAction(types.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(types.SIGN_OUT_START);

export const signOutSuccess = () => createAction(types.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) => createAction(types.SIGN_UP_FAILED, error);