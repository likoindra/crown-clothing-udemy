import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
// import thunk from 'redux-thunk';

// REDUX SAGA 
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./root-saga";

// root reducer
import { rootReducer } from "./root.reducer";

// ROOT STATE type 
export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    // Note: ` ?: ` mean the extention can be used or not 
    // cause it can be loaded by devtools or not 
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// Extending persist config 
type ExtentedPersistConfig = PersistConfig<RootState> & {
  // whitelist will only contain array of key from RootState
  // keyof : will get only values 
  whitelist: (keyof RootState)[]
}

// -------------------------- REDUX PERSIST CONFIG --------------------

const persistConfig: ExtentedPersistConfig = {
  key: 'root',
  // using local storage to save what we want to save 
  storage,

  // choose the reducer that didn't want to persist 
  // blacklist : ['user']

  // only the main thing that want to persist , using whitelist 
  // only `cart reducer`, because after adding some products to cart , 
  // and when want to checkout , we still have the current value even after refreshing
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// -------------------------- REDUX SAGA MIDDLEWARE --------------------

const sagaMiddleware = createSagaMiddleware();

// -------------------------- REDUX SAGA MIDDLEWARE --------------------


// -------------------------- REDUX PERSIST CONFIG --------------------


// -------------------------- REDUX DEVTOOLS CONFIG --------------------

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose 

// -------------------------- REDUX DEVTOOLS CONFIG --------------------

const middlewares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter((middleware):middleware is Middleware => Boolean(middleware));

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

// run the saga middleware 
sagaMiddleware.run(rootSaga);

// export the persist store 
export const persistor = persistStore(store)
