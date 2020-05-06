import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShoppingItemRow from './ShoppingItemRow';
import * as actions from '../../../actions/sweetBudgetActions';

export class CurateShoppingList extends React.Component {
  propTypes = {
    actions: PropTypes.object.isRequired,
    shopping_list: PropTypes.arrayOf(PropTypes.object).isRequired
  };
  render() {
    return (
      <div className={'container'}>
        <div className={'cart-header'}>
          green-cart
          yellow-cart
          red-cart
        </div>

          {this.props.shopping_list.items.map(item => <ShoppingItemRow item={item} />)}
      </div>

    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    shopping_list: state.shoppingList.shopping_list,
    essentialItems: state.shoppingList.essentialItems,
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
