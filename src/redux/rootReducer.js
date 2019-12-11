import { combineReducers } from 'redux';
import budgetReducers from './budget/budgetReducer';

const rootReducer = combineReducers({
  budgetData: budgetReducers,
});

export default rootReducer;
