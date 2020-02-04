import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import BudgetForm from './BudgetForm/BudgetForm';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import ExpensesTable from './ExpensesTable/ExpensesTable';
import Values from './Values/Values';
import * as budgetSelectors from '../redux/budget/budgetSelectors';

const Container = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  align-items: flex-start;
  grid-gap: 24px;
  max-width: 960px;
  padding-top: 50px;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: auto;
  margin-right: auto;
`;

const App = ({ expenses }) => {
  return (
    <Container>
      <BudgetForm />
      <Values />
      <ExpenseForm />
      {expenses.length > 0 && <ExpensesTable />}
    </Container>
  );
};

const mapStateToProps = store => ({
  expenses: budgetSelectors.getExpenses(store),
});

App.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps, null)(App);
