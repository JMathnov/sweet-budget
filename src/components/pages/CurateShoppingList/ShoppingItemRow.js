import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {median} from 'mathjs';

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

import BlacklistDialog from './BlacklistDialog';

export class ShoppingItemRow extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    essentialItems: PropTypes.object,
    changePrice: PropTypes.func.isRequired,
    blacklistProduct: PropTypes.func.isRequired,
  };

  getAllowedItems(item) {
    const items = _.get(this.props.essentialItems, item.category, {});
    return _.filter(items, item => !item.blacklisted);
  }

  getProductAveragePrice(item, allowedItems) {
    if (allowedItems.length === 0) {
      return {};
    } else {
      const prices = _.sortBy(allowedItems.map(item => parseFloat(item.price_current) / 100));
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
    const allowedItems = this.getAllowedItems(this.props.item);
    const priceProfile = this.getProductAveragePrice(this.props.item, allowedItems);
    return (
      <Grid container spacing={1} alignItems={'center'}>

        <Grid item xs={1}>
          <Button variant="text"
                  color="primary"
                  size="small"
                  onClick={() => this.props.openDialog()}>
            {this.props.item.name}
          </Button>
        </Grid>

        <BlacklistDialog {...this.props} allowedItems={allowedItems}/>

        <Grid item xs={1}>
          {this.props.item.quantity}
        </Grid>
        <Grid item xs={1}>
          {this.props.item.limit_price ? "$" + this.props.item.limit_price : "N/a"}
        </Grid>

        <Grid item xs={9}>
          <Slider
            defaultValue={priceProfile.median}
            getAriaValueText={(item) => "$" + item}
            aria-labelledby="discrete-slider-custom"
            step={0.05}
            min={priceProfile.cheapest * .75}
            max={priceProfile.median * 1.25}
            valueLabelDisplay="auto"
            marks={[{
              value: priceProfile.cheapest,
              label: "$" + priceProfile.cheapest
            }, {
              value: priceProfile.mostExpensive,
              label: "$" + priceProfile.mostExpensive
            }, {value: priceProfile.median, label: "Med: $" + priceProfile.median}]}
            onChange={(event, newValue) => {
              this.props.changePrice(newValue)
            }}
          />
        </Grid>

      </Grid>

    );
  }
}
