import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { USER_ACTION_TYPES as types } from "../user.types";

import { signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed, EmailSignInStart, SignUpStart, SignUpSuccess } from "../user.action";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from "../../../utils/firebase/firebase-utils";

import { User } from "@firebase/auth";

import { AdditionalInformation } from "../../../utils/firebase/firebase-utils";


//  ------------------------ GENERATOR SAGA ------------------------ 


// user saga for user register 
// all off sign in , sign up, by email will go through this saga function 
export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
        // console.log(userSnapshot)
        // console.log(userSnapshot.data())
        // push data userSnapshot pada `signInSuccess` function

        if (userSnapshot) {
        yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
        };

        // console.log(userSnapshot);
        // console.log(userSnapshot.data());
    } catch (error) { 
        // if error 
        yield* put(signInFailed(error as Error))
    }
}

// SIGN IN WITH GOOGLE 
// trigger pop up with google, take the auth oject and pull out the user auth and run getSnapshotFromAuth function 
export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        // call getSnapshotFromAuth function and user for argumen 
        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

// SIGN IN WITH EMAIL 
// from the action emailSignInStart has payload emal and password 
export function* signInWithEmail({ payload: { email , password }}: EmailSignInStart) {
    try {
        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email , password);
        // const { user } = yield* call(signInAuthUserWithEmailAndPassword, email , password);
        // check the user from userCredential 
        if ( userCredential ) {
        const { user } = userCredential;
        // call getSnapshotFromUserAuth and pass the `user` parameter
        yield* call(getSnapshotFromUserAuth, user)
        }

    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

// SIGN UP WITH EMAIL PASSWORD AND DISPLAYNAME 
export function* signUp({ payload: { email, password , displayName }}: SignUpStart) {
    try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email , password );
    // const { user } = yield* call(createAuthUserWithEmailAndPassword, email , password );

    // after succeed
    if ( userCredential ) {
    const { user } = userCredential;
    // recieve 2 values user and additionalDetails. 
    yield* put(signUpSuccess(user, { displayName }));
    }

    } catch (error) {
    yield* put(signUpFailed(error as Error))
    }
}

// AFTER SIGN UP USER WILL AUTOMATICALLY SIGN IN
// this function will recieve `user` and `additionalDetails` for parameter 
export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails)
}

// SIGN OUT FUNCTION 
export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}


// CHECK WHETER USER AUTHENTICATED OR NOT 
export function* isUserAuthenticated() {
    try {
        // getCurrentUser, mengecek apakah user masih terautentikasi atau tidak
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) return;

        // memanggil function getSnapshotFromUserAuth
        // passing userAuth sebagai argumen 
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

//  ------------------------ GENERATOR SAGA ------------------------ 


// function sign in with email and password 
export function* onEmailSignInStart() {
    yield* takeLatest(types.EMAIL_SIGN_IN_START, signInWithEmail)
}


// function sign in with google 
export function* onGoogleSignInStart() {
    yield* takeLatest(types.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


// function check user session 
export function* onCheckUserSession() {
    // parameter kedua mengambil function isUserAuthenticated
    yield* takeLatest(types.CHECK_USER_SESSION, isUserAuthenticated)
}

// function sign up with email and password 
export function* onSignUpStart() {
    yield* takeLatest(types.SIGN_UP_START, signUp)
}

// function sign up success 
export function* onSignUpSuccess() {
    yield* takeLatest(types.SIGN_UP_SUCCESS, signInAfterSignUp)
}

// function sign out 
export function* onSignOutSuccess() {
    yield* takeLatest(types.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutSuccess)
    ])
}