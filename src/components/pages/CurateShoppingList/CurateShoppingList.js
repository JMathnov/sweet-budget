import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ShoppingItemRow} from './ShoppingItemRow';
import * as actions from '../../../actions/sweetBudgetActions';
import Grid from "@material-ui/core/Grid";

export class CurateShoppingList extends React.Component {
  propTypes = {
    actions: PropTypes.object.isRequired,
    shopping_list: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  changeItemLimitPrice(item, limitPrice) {
    this.setState({[item.name] : limitPrice})
  }

  render() {
    return (
      <Grid container spacing={1} className={'cart-header'}>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={2}>
          green-cart
        </Grid>
        <Grid item xs={2}>
          yellow-cart
        </Grid>
        <Grid item xs={2}>
          red-cart
        </Grid>

        {this.props.shopping_list.items.map(item =>
          <ShoppingItemRow item={item} essentialItems={this.props.essentialItems} changePrice={(newPrice) => this.changeItemLimitPrice(item, newPrice)}/>
          )}
      </Grid>
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
