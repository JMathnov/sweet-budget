import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import {median} from 'mathjs';
import Slider from '@material-ui/core/Slider';
import Popup from "reactjs-popup";
import blacklistIcon from '../../../assets/blacklist-icon.png';


export class ProductPurchased extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    limitPrice: PropTypes.number,
    purchasePrice: PropTypes.number,
  };

  render() {
    return (
      <Grid container spacing={1} className={'product-purchased'}>
        <Grid item xs={1}/>
        <Grid item xs={10} className={'purchase-message'}>
          {`Successfully purchased ${this.props.item.quantity} ${this.props.item.name}s for ${this.props.purchasePrice} each. You saved $${((this.props.limitPrice - this.props.purchasePrice) * this.props.item.quantity).toFixed(2)}!`}
        </Grid>
        <Grid item xs={1}/>
      </Grid>
    );
  }
}
