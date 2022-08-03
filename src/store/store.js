import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import thunk from 'redux-thunk';
// root reducer
import { rootReducer } from "./root.reducer";


// -------------------------- REDUX PERSIST CONFIG --------------------

const persistConfig = {
  key: 'root',
  // using local storage to save what we want to save 
  storage,

  // choose the reducer that didn't want to persist 
  // blacklist : ['user']

  // only the main thing that want to persist , using whitelist 
  // only `cart reducer`, because after addign some products to cart , 
  // and when want to checkout , we still have the current value even after refreshing
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


// -------------------------- REDUX PERSIST CONFIG --------------------


// -------------------------- REDUX DEVTOOLS CONFIG --------------------

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose 

// -------------------------- REDUX DEVTOOLS CONFIG --------------------

const middlewares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean);

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  // rootReducer,
  // change the 'root reducer' using persistedReducer
  // now the store by default using redux-persist config
  persistedReducer,
  undefined,
  composedEnhancers
  //   composeWithDevTools(applyMiddleware(...middlewares))
);

// export the persist store 
export const persistor = persistStore(store)
