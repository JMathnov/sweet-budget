import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router-dom";

import withStyles from "@material-ui/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import CategoryList from './CategoryList';
import ShoppingItemRow from './ShoppingItemRow';
import * as actions from '../../../actions/sweetBudgetActions';
import assets from './assets'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 25,
    paddingBottom: 25
  },
  bolder: {
    color: '#292a2a',
    fontWeight: 600
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
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  maxHeightWrapper: {
    maxHeight: 715,
    overflow: 'auto',
    width: 284
  }
});

export class NewShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  adjustCart = (item, func) => {
    this.props.actions.adjustCart(item, func);
  }

  render() {
    const { classes } = this.props;

    console.log(this.props.product_category_list.map(u => u.category))

    return (
      <div className={classes.root}>
        <Grid container spacing={0} justify="center" className={classes.grid}>
          <Grid item md={9}>
            <Paper className={classes.paper} style={{ position: "relative" }}>
                <Typography variant="h4" gutterBottom className={classes.bolder}>
                  Shop Essential Items
                </Typography>
                <Typography variant="body1">
                  Select product categories for your budget
                </Typography>
                <CategoryList items={this.props.product_category_list} assets={assets} onClick={this.adjustCart} />
            </Paper>
          </Grid>
          <Grid item md={3} className={classes.rightPanel}>
            <Paper className={classes.paper} style={{ position: "relative" }}>
                <Typography variant="h5" gutterBottom>
                  Shopping List
                </Typography>
              <div className={classes.maxHeightWrapper}>
                <Grid container justify="center">
                  {this.props.shopping_list.items.map((item) =>
                    <Grid item xs={12}>
                      <ShoppingItemRow item={item} assets={assets} adjust={this.adjustCart}></ShoppingItemRow>
                    </Grid>
                  )}
                </Grid>
              </div>
              <Grid item justify="center">
                <Button
                  to={{pathname: "/curate-shopping-list"}}
                  component={Link}
                  variant="outlined"
                  color="primary"
                  className={classes.actionButtom} disabled={this.props.shopping_list.items.length <= 0}>
                  Submit
                </Button>
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
