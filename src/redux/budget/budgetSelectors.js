export const getBudget = store => store.budgetData.budget;

export const getExpenses = store => store.budgetData.expenses;

export const calculateTotalExpenses = store => {
  const arrExpenses = getExpenses(store);
  const sum = arrExpenses.reduce((acc, el) => acc + el.amount, 0);

  return sum;
};

export const calculateBalance = store =>
  getBudget(store) - calculateTotalExpenses(store);
