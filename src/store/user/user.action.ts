import { USER_ACTION_TYPES as types } from './user.types' 
import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { UserData, AdditionalInformation } from '../../utils/firebase/firebase-utils';

// Define action for each type 
export type CheckUserSession = Action<types.CHECK_USER_SESSION>;

export type SetCurrentUser = ActionWithPayload<types.SET_CURRENT_USER, UserData>;

export type GoogleSignInStart = Action<types.GOOGLE_SIGN_IN_START>;

export type EmailSignInStart = ActionWithPayload<types.EMAIL_SIGN_IN_START, { email : string, password: string}>;

export type SignUpStart = ActionWithPayload<types.SIGN_UP_START, { email: string, password: string, displayName: string}>;

export type SignUpSuccess = ActionWithPayload<types.SIGN_IN_SUCCESS, { user: UserData, additionalDetails: AdditionalInformation}>;

export type SignUpFailed = ActionWithPayload<types.SIGN_UP_FAILED, Error>;

export type SignInSuccess = ActionWithPayload<types.SIGN_IN_SUCCESS, UserData>;

export type SignInFailed = ActionWithPayload<types.SIGN_IN_FAILED, Error>;

export type SignOutStart = Action<types.SIGN_OUT_START>;

export type SignOutSuccess = Action<types.SIGN_OUT_SUCCESS>;

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => createAction(types.SET_CURRENT_USER, user));

export const checkUserSession = withMatcher((): CheckUserSession => createAction(types.CHECK_USER_SESSION));

export const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(types.GOOGLE_SIGN_IN_START));

// emailSignInStart memiliki 2 parameter email dan password , 
// memberikan payload email & password 
export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => createAction(types.EMAIL_SIGN_IN_START, { email, password }));

export const signInSuccess = withMatcher((user: UserData): SignInSuccess => createAction(types.SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher((error: Error): SignInFailed => createAction(types.SIGN_IN_FAILED, error)); 

export const signUpStart = withMatcher((email: string , password: string, displayName: string ): SignUpStart => createAction(types.SIGN_UP_START, { email, password, displayName}));

export const signUpSuccess = withMatcher((user: UserData, additionalDetails: AdditionalInformation): SignUpSuccess => createAction(types.SIGN_IN_SUCCESS, { user, additionalDetails }));

export const signUpFailed = withMatcher((error: Error):SignUpFailed => createAction(types.SIGN_UP_FAILED, error));

export const signOutStart = withMatcher((): SignOutStart => createAction(types.SIGN_OUT_START));

export const signOutSuccess = withMatcher(():SignOutSuccess => createAction(types.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher((error: Error): SignUpFailed => createAction(types.SIGN_UP_FAILED, error));