import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Form from '../shared/Form';
import Label from '../shared/Label';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { getExpenses } from '../../redux/budget/budgetSelectors';
import { addExpenses } from '../../redux/budget/budgetActions';

const labelStyles = `
  margin-bottom: 16px;
`;

class ExpenseForm extends Component {
  static propTypes = {
    expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onSave: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    amount: 0,
  };

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, amount } = this.state;
    const { onSave } = this.props;

    onSave({ name, amount: Number(amount), id: shortid.generate() });
    this.setState({ name: '', amount: 0 });
  };

  render() {
    const { name, amount } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Label customStyles={labelStyles}>
          Enter expense name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </Label>
        <Label customStyles={labelStyles}>
          Enter expense amount
          <Input
            type="number"
            name="amount"
            value={amount === 0 ? '' : amount}
            onChange={this.handleChange}
          />
        </Label>

        <Button label="Add" type="submit" />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  expenses: getExpenses(state),
});

const mapDispatchToProps = dispatch => ({
  onSave: data => dispatch(addExpenses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
