import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/fuelSavingsActions';
import FuelSavingsForm from '../FuelSavingsForm';

export class NewShoppingList extends React.Component {
  propTypes = {
    actions: PropTypes.object.isRequired,
    fuelSavings: PropTypes.object.isRequired
  };

  saveFuelSavings = () => {
    this.props.actions.saveFuelSavings(this.props.fuelSavings);
  };

  calculateFuelSavings = e => {
    this.props.actions.calculateFuelSavings(this.props.fuelSavings, e.target.name, e.target.value);
  };

  render() {
    return (
      <FuelSavingsForm
        onSaveClick={this.saveFuelSavings}
        onChange={this.calculateFuelSavings}
        fuelSavings={this.props.fuelSavings}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewShoppingList);