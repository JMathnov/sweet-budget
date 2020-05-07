import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ShoppingItemRow} from './ShoppingItemRow';
import * as actions from '../../../actions/sweetBudgetActions';
import Grid from "@material-ui/core/Grid";
import { Button } from '@honeyscience/honey-ui-toolkit';

export class CurateShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limits: []
    };
  }

  blacklistProduct = (product, category)  => {
    this.props.actions.blacklistProduct(product, category);
  };

  changeItemLimitPrice(item, limitPrice) {
    this.setState({
      limits: {
        ...this.state.limits,
        [item.category]: limitPrice
      },
    });
  }

  submitOrder = (limitOrders) => {
    this.props.actions.submitList(limitOrders);
    window.location.href="/shopping-list-status";
  };

  render() {
    const orderCanBeSubmitted = Object.keys(this.state.limits).length === this.props.shopping_list.items.length ? '' : 'disabled';

    return (
      <Grid container spacing={1} className={'curate'}>
        <Grid item xs={1}/>
        <Grid item xs={1}>Qty</Grid>
        <Grid item xs={1}>Your Limit</Grid>

        <Grid item xs={3} className={'color-cart'} style={{'text-align': 'left'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="feather feather-shopping-cart">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </Grid>
        <Grid item xs={3} style={{'text-align': 'center'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="feather feather-shopping-cart">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </Grid>
        <Grid item xs={3} style={{'text-align': 'right'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="feather feather-shopping-cart">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </Grid>

        {this.props.shopping_list.items.map(item =>
          <ShoppingItemRow
            item={item}
            essentialItems={this.props.essentialItems}
            changePrice={(newPrice) => this.changeItemLimitPrice(item, newPrice)}
            itemPrice={_.get(this.state.limits, item.category, null)} blacklistProduct={this.blacklistProduct} />
          )}

          <Grid item xs={8}/>
          <Grid item xs={4}>
            <Button buttonType="secondary-ghost" copy="Submit Order" onClick={ () => this.submitOrder(this.state.limits) } status={ orderCanBeSubmitted } />
          </Grid>
      </Grid>
    );
  }
}

CurateShoppingList.propTypes = {
  actions: PropTypes.object.isRequired,
  shopping_list: PropTypes.object.isRequired
};

function mapStateToProps(state) {
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
