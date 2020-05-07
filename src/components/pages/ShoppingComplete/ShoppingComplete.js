import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/sweetBudgetActions';

export class ShoppingComplete extends React.Component {
  propTypes = {
    actions: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired
  };

  render() {
    return (<div>{JSON.stringify(this.props.order)}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.shoppingList.order
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
)(ShoppingComplete);
