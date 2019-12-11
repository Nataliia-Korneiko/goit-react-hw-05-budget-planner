import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../shared/Form';
import Label from '../shared/Label';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { getBudget } from '../../redux/budget/budgetSelectors';
import { setBudget } from '../../redux/budget/budgetActions';

const labelStyles = `
  margin-bottom: 16px;
`;

class BudgetForm extends Component {
  static propTypes = {
    budget: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  state = {
    budget: 0,
  };

  componentDidUpdate(prevProps) {
    const { budget } = this.props;

    if (prevProps.budget !== budget) {
      localStorage.setItem('budget', JSON.stringify(budget));
    }
  }

  handleChange = e => {
    this.setState({
      budget: Number(e.target.value),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { budget } = this.state;
    const { onSave } = this.props;

    onSave(budget);
    this.setState({ budget: 0 });
  };

  render() {
    const { budget } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Label customStyles={labelStyles}>
          Enter your total budget
          <Input
            name="budget"
            type="number"
            value={budget === 0 ? '' : budget}
            onChange={this.handleChange}
          />
        </Label>

        <Button label="Save" type="submit" />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  budget: getBudget(state),
});

const mapDispatchToProps = dispatch => ({
  onSave: data => dispatch(setBudget(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BudgetForm);
