import { Middleware } from "redux";

import { RootState } from "../store";

// Middleware take 3 arguements 
// first argument : for extend the middleware 
// second argument : the type of the state 
// third argument : type of dispatch

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }
  
    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState());
  
    next(action);
  
    console.log("next state: ", store.getState());
  }; 