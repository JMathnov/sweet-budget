import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/sweetBudgetActions';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import {median} from 'mathjs';

import Slider from '@material-ui/core/Slider';


export class ShoppingItemRow extends React.Component {
  propTypes = {
    actions: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    essentialItems: PropTypes.object
  };

  getProductAveragePrice(item) {
    const items = _.get(this.props.essentialItems, item.name, {});

    const allowedItems = _.filter(items, item=> !item.blacklisted, []);

    if(allowedItems.length == 0){
      return {};
    } else {
      const prices = allowedItems.map(item=> item.price).sort();
      const cheapest = prices[0];
      const mostExpensive = prices[prices.length - 1];

      return {
        cheapest,
        mostExpensive,
        median: median(prices)
      };
    }



  }

  render() {

    const priceProfile = this.getProductAveragePrice(this.props.item);
    debugger;
    return (
      <Grid container spacing={1}>
          <Grid item xs={2}>
            {this.props.item.name}
          </Grid>
          <Grid item xs={2}>
            {this.props.item.quantity}
          </Grid>
          <Grid item xs={2}>
            {this.props.item.price}
          </Grid>

        <Grid item xs={6}>

        </Grid>

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
)(ShoppingItemRow);
