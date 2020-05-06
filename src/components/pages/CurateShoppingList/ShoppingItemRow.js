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
    essentialItems: PropTypes.object,
    changePrice: PropTypes.func.isRequired,
    itemPrice: PropTypes.number
  };

  getProductAveragePrice(item) {
    const items = _.get(this.props.essentialItems, item.category, {});

    const allowedItems = _.filter(items, item=> !item.blacklisted, []);

    if(allowedItems.length === 0){
      return {};
    } else {
      const prices = _.sortBy(allowedItems.map(item=> parseFloat(item.price_current) / 100));
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
    return (
      <Grid container spacing={1}>
          <Grid item xs={1}>
            {this.props.item.name}
          </Grid>
          <Grid item xs={1}>
            {this.props.item.quantity}
          </Grid>
          <Grid item xs={1}>
            {this.props.itemPrice ? "$" + this.props.itemPrice : "N/a"}
          </Grid>

        <Grid item xs={9}>
          <Slider
            defaultValue={priceProfile.median}
            getAriaValueText={(item) => "$" + item}
            aria-labelledby="discrete-slider-custom"
            step={0.01}
            min={priceProfile.cheapest * .95}
            max={priceProfile.mostExpensive * 1.05}
            valueLabelDisplay="auto"
            marks={[{value: priceProfile.median, label: "Median"}]}
            onChange={(event, newValue) => {this.props.changePrice(newValue)}}
          />
        </Grid>

      </Grid>

    );
  }
}
