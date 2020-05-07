import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from "react-router-dom";

import withStyles from "@material-ui/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import CategoryList from './CategoryList';
import * as actions from '../../../actions/sweetBudgetActions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 25,
    paddingBottom: 25
  },
  grid: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  leftPanel: {
    width: '100%',
    height: 800,
  },
  rightPanel: {
    width: '100%',
    height: 800,
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  buttonBar: {
    display: "flex",
  },
});

const ShoppingItemRow = ({item, adjust}) => (
  <div>
    <Button
    variant="outlined"
    color="primary"
    onClick={() => adjust("+", item)}>+</Button>
    <Button
    variant="outlined"
    color="primary"
    onClick={() => adjust("-", item)}>-</Button>
    <div>x{item.quantity}</div>
    <div>{item.name}</div>
  </div>
)

export class NewShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  adjustQauntity = (sign, item) => {
    console.log("Adjust Quantity")
  }

  addItemToCart = (item) => {
    const shoppingListItem = {
      ...item,
      quantity: 1,
      limit_price:  null,
      goodUntil: null,
      purchasePrice: null,
      honeyGold: null
    };

    this.props.actions.addProductToSoppingList(shoppingListItem);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={0} justify="center" className={classes.grid}>
          <Grid item md={9}>
            <Paper className={classes.paper} style={{ position: "relative" }}>
                <Typography variant="h5" gutterBottom>
                  Shop Essential Items
                </Typography>
                <Typography variant="body2">
                  Select product categories for your budget
                </Typography>
                <CategoryList items={this.props.product_category_list} onClick={this.addItemToCart} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={3} className={classes.grid3}>
            <Paper className={classes.paper} style={{ position: "relative" }}>
              <Grid container justify="center" className={classes.rightPanel}>
                <Typography variant="h5" gutterBottom>
                Shopping List
                </Typography>
                <Grid container justify="center">
                  {this.props.shopping_list.items.map((item) =>
                    <Grid item>
                      <ShoppingItemRow item={item} adjust={this.adjustQauntity}></ShoppingItemRow>
                    </Grid>
                  )}
                </Grid>
                <Grid item>
                  <div className={classes.buttonBar}>
                    <Button
                      to={{ pathname: "/curate-shopping-list" }}
                      component={Link}
                      variant="outlined"
                      color="primary"
                      className={classes.actionButtom}>
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
      </Grid>
    </div>
    );
  }
}

NewShoppingList.propTypes = {
  actions: PropTypes.object.isRequired,
  product_category_list: PropTypes.object.isRequired,
  shopping_list: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    product_category_list: state.shoppingList.product_category_list,
    shopping_list: state.shoppingList.shopping_list
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
)(withStyles(styles)(NewShoppingList));
