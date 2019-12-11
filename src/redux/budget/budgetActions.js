import types from '../types';

export const setBudget = budget => ({
  type: types.SET_BUDGET,
  payload: {
    budget,
  },
});

export const addExpenses = expenses => ({
  type: types.ADD_EXPENSES,
  payload: {
    expenses,
  },
});

export const removeExpenses = id => ({
  type: types.REMOVE_EXPENSES,
  payload: {
    id,
  },
});
