import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";

import * as authentificateReducer from '../LoginPage/reducers';
import * as contactReducer from '../Contact/reducers';
import * as usersReducer from '../Admin/reducers';
import * as userReducer from '../MyPage/reducers';
import * as workerUserReducer from '../Worker/reducers';

export default function configureStore(history, initialState) {
  const reducers = {
    authentificateUser: authentificateReducer.reducer,
    comment: contactReducer.reducer,
    users: usersReducer.reducer,
    user: userReducer.reducer,
    workerUsers: workerUserReducer.reducer
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment && typeof window !== "undefined" && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  return store;
}