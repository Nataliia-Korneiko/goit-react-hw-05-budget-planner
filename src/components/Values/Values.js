import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Value from '../Value/Value';
import {
  getBudget,
  calculateTotalExpenses,
  calculateBalance,
} from '../../redux/budget/budgetSelectors';

const Container = styled.section`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

const Values = ({ budget, expenses, balance }) => (
  <Container>
    <Value label="Budget" value={budget} isPositive />
    <Value label="Expenses" value={expenses} />
    <Value label="Balance" value={balance} isPositive={balance >= 0} />
  </Container>
);

const mapStateToProps = store => ({
  budget: getBudget(store),
  expenses: calculateTotalExpenses(store),
  balance: calculateBalance(store),
});

Values.propTypes = {
  budget: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Values);
