import { combineReducers } from 'redux';
import shoppingList from './shoppingListReducer';
import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  shoppingList,
});

export default rootReducer;
