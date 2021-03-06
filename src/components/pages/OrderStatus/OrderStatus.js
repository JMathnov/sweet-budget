import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from '@honeyscience/honey-ui-toolkit';
import * as actions from '../../../actions/sweetBudgetActions';
import { ProductPurchased } from './ProductPurchased';

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};


const styles = {
  main: {
    minWidth: '800px',
    maxWidth: '1100px',
    minHeight: '400px',
    paddingTop: '75px',
    paddingBottom: '75px',
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 130px 30px 130px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0px 0px 30px 0px',
  },
  resetButton: {
    margin: '0px 15px 0px 0px',
  },
  titleSection: {
    display: 'flex',
    margin: '0px 0px 15px 0px',
    fontSize: '15px',
    fontWeight: 600,
  },
  titleValue: {
    width: '20%',
  },
  itemRow: {
    display: 'flex',
    margin: '0px 0px 10px 0px',
  },
  itemValue: {
    width: '25%',
  },
  summarySection: {
    display: 'flex',
    margin: '40px 0px 0px 0px',
  },
  summaryItem: {
    display: 'flex',
    width: '25%',
  },
  summaryHeader: {
    fontSize: '14px',
    fontWeight: 500,
  },
  summaryValue: {}
};


export class OrderStatus extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    selectedShoppingItems: PropTypes.array.isRequired,
    dailyCurrentPrices: PropTypes.object.isRequired,
    updatePurchasePricesForDay: PropTypes.func.isRequired,
  };

  state = {
    day: 0,
  };

  onResetClick = () => {
    const {resetPurchasePrices} = this.props.actions;

    this.setState({day: 0});
    resetPurchasePrices();
  };

  onNextDayClick = () => {
    const {updatePurchasePricesForDay} = this.props.actions;
    const nextDay = this.state.day + 1;

    this.setState(() => ({day: nextDay}));
    updatePurchasePricesForDay({day: nextDay});
  };

  orderCompletedEverythingPurchased = (totalSaved, bonusGold) => {
    const {orderCompleted} = this.props.actions;

    orderCompleted(totalSaved, bonusGold);
    this.props.history.push("/order-complete")
  };

  renderItems = () => {
    const {selectedShoppingItems, dailyCurrentPrices} = this.props;
    const currentDay = this.state.day;

    const orderedItems = _.sortBy(selectedShoppingItems, item => !!item.purchasePrice);


    return orderedItems.map((item) => {
      const {name, category, purchasePrice, goodUntil, limit_price} = item;
      const currentPrice = dailyCurrentPrices[category][currentDay];
      const dynamicGoodUntil = Math.max(0, goodUntil - this.state.day);

      const purchasedProduct = !!purchasePrice && <ProductPurchased item={item} purchasePrice={purchasePrice} limitPrice={limit_price}/>;

      return (
        <>
          <div style={styles.itemRow} key={`${category}_row`}>
            <div style={styles.itemValue}>{name}</div>
            <div style={styles.itemValue}>{item.quantity}</div>
            <div style={styles.itemValue}>$&nbsp;{limit_price || '-'}</div>
            <div style={styles.itemValue}>$&nbsp;{currentPrice}</div>
            <div
              style={styles.itemValue}>{dynamicGoodUntil > 0 ? `${dynamicGoodUntil} day(s)` : 'Not checking anymore'}</div>
          </div>
          <div key={`${category}_purchase_msg`}>
            { purchasedProduct }
          </div>
        </>
      );
    });
  };

  render() {
    const {dailyCurrentPrices, selectedShoppingItems} = this.props;
    const nextDayButtonStatus = this.state.day === dailyCurrentPrices.toilet_paper.length - 1 ? 'disabled' : '';
    const estimatedPrice = selectedShoppingItems.reduce((acc, item) => (acc + (item.quantity * item.limit_price)), 0).toFixed(2);

    const totalSaved = selectedShoppingItems.filter(item => !!item.purchasePrice).reduce((acc, item) => acc + ((item.limit_price - item.purchasePrice) * item.quantity), 0);
    const totalSpent = selectedShoppingItems.filter(item => !!item.purchasePrice).reduce((acc, item) => acc + (item.purchasePrice * item.quantity), 0);
    const bonusGold = totalSpent * .05 * 100; // gold is represented in pennies

    const allPurchased = selectedShoppingItems.filter(item => !!item.purchasePrice).length === selectedShoppingItems.length;
    if(allPurchased) {
      console.log('All Items are purchased. Move to Order Complete.');
      this.orderCompletedEverythingPurchased(totalSaved, bonusGold);
    }

    return (
      <div style={styles.main}>
        <div style={styles.buttons}>
          <div style={styles.resetButton}><Button buttonType="secondary-ghost" copy="Reset"
                                                  onClick={this.onResetClick}/></div>
          <Button buttonType="secondary-ghost" copy="Next Day" onClick={this.onNextDayClick}
                  status={nextDayButtonStatus}/>
        </div>
        <div style={styles.titleSection}>
          <div style={styles.titleValue}>Product</div>
          <div style={styles.titleValue}>Quantity</div>
          <div style={styles.titleValue}>Limit Price</div>
          <div style={styles.titleValue}>Current Price</div>
          <div style={styles.titleValue}>Good Until</div>
        </div>
        <div>
          {this.renderItems()}
        </div>
        <div style={styles.summarySection}>
          <div style={styles.summaryItem}>
            <div style={styles.summaryHeader}>Honey Gold Purchased:&nbsp;</div>
            <div style={styles.summaryValue}>{estimatedPrice * 100}</div>
          </div>
          <div style={styles.summaryItem}>
            <div style={styles.summaryHeader}>Honey Gold Used:&nbsp;</div>
            <div style={styles.summaryValue}>{totalSpent.toFixed(2) * 100}</div>
          </div>

          <div style={styles.summaryItem}>
            <div style={styles.summaryHeader}>Bonus Gold (5%):&nbsp;</div>
            <div style={styles.summaryValue}>{bonusGold.toFixed(0)} Honey Gold</div>
          </div>
          <div style={styles.summaryItem}>
            <div style={styles.summaryHeader}>Total Savings:&nbsp;</div>
            <div style={styles.summaryValue}>$&nbsp;{totalSaved.toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    selectedShoppingItems: state.shoppingList.shopping_list.items || EMPTY_ARRAY,
    dailyCurrentPrices: state.shoppingList.dailyCurrentPrices || EMPTY_OBJECT,
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
)(OrderStatus);
