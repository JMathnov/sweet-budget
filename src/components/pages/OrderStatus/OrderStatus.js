import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/sweetBudgetActions';


const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};


const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 130px 30px 130px',
  },
  titleSection: {
    display: 'flex',
    margin: '0px 0px 15px 0px',
    fontSize: '15px',
    fontWeight: 600,
  },
  titleValue: {
    width: '25%',
  },
  itemRow: {
    display: 'flex',
    margin: '0px 0px 10px 0px',
  },
  itemValue: {
    width: '25%',
  }
}


export class OrderStatus extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    selectedShoppingItems: PropTypes.array.isRequired,
    dailyCurrentPrices: PropTypes.object.isRequired,
  }

  state = {
    day: 0,
  }

  renderItems = () => {
    const { selectedShoppingItems, dailyCurrentPrices } = this.props;
    const currentDay = this.state.day;

    return selectedShoppingItems.map((item) => {
      const { name, category, goodUntil } = item;
      const currentPrice = dailyCurrentPrices[category][currentDay];

      return (
        <div style={ styles.itemRow } key={ category }>
          <div style={ styles.itemValue }>{ name }</div>
          <div style={ styles.itemValue }>{ '-' }</div>
          <div style={ styles.itemValue }>{ currentPrice }</div>
          <div style={ styles.itemValue }>{ goodUntil }</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div style={ styles.main }>
        <div style={ styles.titleSection }>
          <div style={ styles.titleValue }>Product</div>
          <div style={ styles.titleValue }>Purchase Price</div>
          <div style={ styles.titleValue }>Current Price</div>
          <div style={ styles.titleValue }>Good Until</div>
        </div>
        <div>
          { this.renderItems() }
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
