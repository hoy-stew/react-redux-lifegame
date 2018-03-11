import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import lifegameReducer from './reducers/Lifegame';

export default function createStore() {
  const store = reduxCreateStore(
    combineReducers({
      lifegame: lifegameReducer,
    }),
    applyMiddleware(
      logger,
    )
  );

  return store;
}