import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/sweetBudgetActions';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/styles/withStyles";
import * as redCross from '../../../assets/red-cross.png';
import * as doctorsWithoutBorders from '../../../assets/doctors-without-borders.png';
import * as doctorsForAmerica from '../../../assets/doctors-for-america.png';
import * as feedingAmerica from '../../../assets/feeding-america.jpg';
import * as shelter from '../../../assets/shelter.png';
import * as sierraClub from '../../../assets/sierra-club.png';

import * as lorientable from '../../../assets/lorientable.jpg';
import * as highTidePoke from '../../../assets/high-tide-poke.jpg';
import * as kalzbrgr from '../../../assets/kalzbrgr.png';
import * as ounceOfPrevention from '../../../assets/ounce-of-prevention.jpg';
import * as permian from '../../../assets/permian.jpg';
import * as ginos from '../../../assets/ginos.jpg';

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
  root: {
    flexGrow: 1,
    paddingTop: 25,
    paddingBottom: 25
  },
  leftPanel: {
    width: '100%',
    height: 800,
  },
  rightPanel: {
    width: '100%',
    height: 800,
  },
  buttonBar: {
    display: "flex",
  },
  itemRow: {
    display: 'flex',
    margin: '0px 0px 10px 0px',
  },
  itemValue: {
    border: '1px',
    padding: '3%',
    width: '33%',
  },
  optionButton: {
    border: '1px solid',
    padding: '3%',
    width: '33%',
    cursor: 'pointer',
  }
};

export class ShoppingComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  propTypes = {
    actions: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired
  };

  selectOption(optionType) {
    this.setState({selected: optionType})
  }

  render() {
    const {order} = this.props;
    const {totalSaved, bonusGold} = order;


    const restaurantList = <Grid container spacing={1}>
      <Grid item xs={4}>
        <img src={lorientable} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={highTidePoke} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={kalzbrgr} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={ounceOfPrevention} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={permian} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={ginos} style={{height: '60px', width: '60px'}}/>
      </Grid>
    </Grid>;

    const charityList = <Grid container spacing={1}>
      <Grid item xs={4}>
        <img src={redCross} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={doctorsWithoutBorders} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={doctorsForAmerica} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={feedingAmerica} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={shelter} style={{height: '60px', width: '60px'}}/>
      </Grid>
      <Grid item xs={4}>
        <img src={sierraClub} style={{height: '60px', width: '60px'}}/>
      </Grid>
    </Grid>;

    return (
      <div className={styles.main}>
        You saved ${totalSaved} by using Honey's Sweet Budgets! <br/><br/>Here's an extra {bonusGold} Honey Gold to get your next shopping list started!


        What would you like to do with your savings?
        <div style={styles.itemRow}>
          <div style={styles.optionButton} onClick={() => this.selectOption('save')}>
            Apply it towards my next Shopping List
          </div>
          <div style={styles.optionButton} onClick={() => this.selectOption('charity')}>
            Donate to Charity
          </div>
          <div style={styles.optionButton} onClick={() => this.selectOption('restaurant')}>
            Purchase Local Restaurant Giftcards
          </div>
        </div>

        {this.state.selected === 'charity' ? charityList : null}
        {this.state.selected === 'restaurant' ? restaurantList : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.shoppingList.order
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
)(ShoppingComplete);
