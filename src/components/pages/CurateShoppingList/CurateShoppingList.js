import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/sweetBudgetActions';

export class CurateShoppingList extends React.Component {
  propTypes = {
    actions: PropTypes.object.isRequired,
    shopping_list: PropTypes.arrayOf(PropTypes.object).isRequired
  };
  render() {
    console.log(this.props.shopping_list);

    debugger;
    return (
      <div className={'shopping-list'}>
        CURATION
        {this.props.shopping_list.items.map(item => <div>{item.name}</div>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  debugger;
  console.log(state);
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
)(CurateShoppingList);
