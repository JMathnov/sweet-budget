import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ShoppingItemRow} from './ShoppingItemRow';
import * as actions from '../../../actions/sweetBudgetActions';
import withStyles from "@material-ui/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Button} from '@honeyscience/honey-ui-toolkit';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 25,
    paddingBottom: 25
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
})

export class CurateShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limits: [],
      blacklistDialog: false,
    };
  }

  blacklistProduct = (product, category) => {
    this.props.actions.blacklistProduct(product, category);
  };

  changeItemLimitPrice(item, limitPrice) {
    this.props.actions.submitList({[item.category]: limitPrice});
  }

  submitOrder = () => {
    this.props.history.push("/shipping-and-payment");
  };

  openDialog = event => {
    this.setState({ blacklistDialog: true });
  };

  render() {
    const { classes } = this.props;

    const shoppingItemsWithLimit = _.filter(this.props.shopping_list.items, item => !!item.limit_price);
    const orderCanBeSubmitted = shoppingItemsWithLimit.length === this.props.shopping_list.items.length ? '' : 'disabled';

    const orderTotal = shoppingItemsWithLimit.map(item => item.limit_price * item.quantity).reduce((a,b) => a + b, 0);

    const output =
    <div className={classes.root}>
      <Paper className={classes.paper}>
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

          <Grid container
                direction="column"
                justify="space-between"
          >
            <Grid item xs={12}>
            {this.props.shopping_list.items.map(item =>
            <ShoppingItemRow
              item={item}
              essentialItems={this.props.essentialItems}
              changePrice={(newPrice) => this.changeItemLimitPrice(item, newPrice)}
              openDialog={this.openDialog}
              blacklistDialog={this.state.blacklistDialog}
              blacklistProduct={this.blacklistProduct}/>
            )}
            </Grid>
          </Grid>

          <Grid item xs={3}>
          Order Total:&nbsp;$&nbsp;{orderTotal}
          </Grid>

          <Grid item xs={9}>
            <Button buttonType="secondary-ghost" copy="Submit Order" onClick={() => this.submitOrder(this.state.limits)}
                      status={orderCanBeSubmitted}/>
          </Grid>

        </Grid>
      </Paper>
    </div>;

    return (
        output
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
)(withStyles(styles)(CurateShoppingList));
