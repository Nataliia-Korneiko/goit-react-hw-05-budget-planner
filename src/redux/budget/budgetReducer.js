import types from '../types';

const budgetLocalStorage = localStorage.getItem('budget');
let budget = 0;

if (budgetLocalStorage) {
  budget = JSON.parse(budgetLocalStorage);
}

const expensesLocalStorage = localStorage.getItem('expenses');
let expenses = [];

if (expensesLocalStorage) {
  expenses = JSON.parse(expensesLocalStorage);
}

const initialState = { budget, expenses };

const budgetReducer = (state = { ...initialState }, { type, payload }) => {
  switch (type) {
    case types.SET_BUDGET:
      return { ...state, budget: state.budget + payload.budget };

    case types.ADD_EXPENSES:
      return { ...state, expenses: [...state.expenses, payload.expenses] };

    case types.REMOVE_EXPENSES: {
      const newExpenses = state.expenses.filter(el => el.id !== payload.id);
      return { ...state, expenses: newExpenses };
    }
    default:
      return state;
  }
};

export default budgetReducer;
