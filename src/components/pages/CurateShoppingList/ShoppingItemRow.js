import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import {median} from 'mathjs';
import Slider from '@material-ui/core/Slider';
import Popup from "reactjs-popup";
import blacklistIcon from '../../../assets/blacklist-icon.png';


export class ShoppingItemRow extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    essentialItems: PropTypes.object,
    itemPrice: PropTypes.number,
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
      <Grid container spacing={1}>


        <Popup trigger={<Grid item xs={1}
                              modal
                              closeOnDocumentClick
                              className={'category_label'}>
          {this.props.item.name}
        </Grid>} position={"center center"}>
          <Grid container spacing={1}>
            {allowedItems.map(product => {
              return (<Grid container spacing={1} className={'popup'}>
                <Grid item xs={2}>
                  <img src={product.image_url_primary}
                       style={{height: '60px', width: '60px', position: 'relative', margin: 'auto', left: '15%'}}/>
                </Grid>
                <Grid item xs={7}>
                  {product.title}
                </Grid>
                <Grid item xs={2}>
                  ${parseFloat(product.price_current) / 100}
                </Grid>
                <Grid item xs={1}>
                  <img
                    src={blacklistIcon}
                    style={{height: '40px', width: '40px', cursor: 'pointer'}}
                    onClick={() => this.props.blacklistProduct(product, this.props.item.category)}/>
                </Grid>
              </Grid>)
            })}
          </Grid>
        </Popup>

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
