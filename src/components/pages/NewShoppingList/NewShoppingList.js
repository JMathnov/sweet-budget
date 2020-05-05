import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/sweetBudgetActions';

export class NewShoppingList extends React.Component {
  saveFuelSavings = () => {
    this.props.actions.saveFuelSavings(this.props.fuelSavings);
  };

  calculateFuelSavings = e => {
    this.props.actions.calculateFuelSavings(this.props.fuelSavings, e.target.name, e.target.value);
  };

  render() {
    return (      <div>asdf</div>

    );
  }
}

NewShoppingList.propTypes = {
  actions: PropTypes.object.isRequired,
  shopping_list: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    shopping_list: state.shoppingList.shopping_list
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
