import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../actions/sweetBudgetActions';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import * as coinyParty from '../../../assets/coiny-confetti.png';

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
import * as coinyWave from "../../../assets/coiny-wave.png";

const styles = {
  main: {
    minWidth: '800px',
    maxWidth: '1100px',
    minHeight: '400px',
    paddingBottom: '75px',
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 160px',
  },
  h1: {
    color: '#292a2a',
    margin: '40px 0px',
    fontSize: '34px',
  },
  h2: {
    fontSize: '24px',
    color: '#4d4d4d',
    fontWeight: 400
  },
  h3: {
    marginTop: 32
  },
  bold: {
    fontWeight: 600
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
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridColumnGap: 24,
    margin: '8px 0'
  },
  itemValue: {
    border: '1px',
    padding: '3%',
    width: '33%',
  },
  optionButton: {
    // border: '1px solid',
    // padding: '3%',
    // width: '33%',
    // cursor: 'pointer',
    cursor: 'pointer',
    height: '40px',
    boxShadow: 'none',
    textShadow: 'none',
    outline: 'none',
    padding: '0px 16px',
    background: 'none',
    transition: 'all 0.2s ease 0s',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '3px',
    backgroundColor: 'rgb(204, 75, 6)',
    borderColor: 'rgb(204, 75, 6)'
  },
  image: {
    height: 75,
    width: 150,
    objectFit: 'contain'
  },
  coinyImg: {
    width: '150px',
    position: 'absolute',
    top: '150px',
    right: '500px',
    objectFit: 'contain',
  }
};

const restaurantImage = [
  lorientable,
  highTidePoke,
  kalzbrgr,
  ounceOfPrevention,
  permian,
  ginos
]

const charityImages = [
  redCross,
  doctorsWithoutBorders,
  doctorsForAmerica,
  feedingAmerica,
  shelter,
  sierraClub
]

export class ShoppingComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired
  };

  selectOption(optionType) {
    this.setState({selected: optionType})
  }

  render() {
    const {totalSaved, bonusGold} = this.props.order;

    const restaurantList = <Grid container spacing={1}>
      {restaurantImage.map(img =>
        <Grid
          item xs={4}
          style={{textAlign: 'center', marginBottom: 16}}
        >
          <img src={img} style={styles.image}/>
        </Grid>
      )}
    </Grid>;

    const charityList = <Grid container spacing={1}>
      {charityImages.map(img =>
        <Grid
          item xs={4}
          style={{textAlign: 'center', marginBottom: 16}}
        >
          <img src={img} style={styles.image}/>
        </Grid>
      )}
    </Grid>;

    return (
      <div style={styles.main}>
        <h1 style={styles.h1}>Order Complete</h1>
        <img src={coinyParty} style={styles.coinyImg}/>

        <h2 style={styles.h2}>
          You saved <span style={styles.bold}>
            ${totalSaved.toFixed(2)}
          </span> by using Honey's Sweet Budgets!
        </h2>
        <h2 style={styles.h2}>

          Here's an extra <span style={styles.bold}>
            {bonusGold.toFixed(0)}
          </span> Honey Gold to get your next shopping list started!
        </h2>

        <h3 style={styles.h3}>
          What would you like to do with your savings?
        </h3>
        <div style={styles.itemRow}>
          <Button
            variant={this.state.selected === 'save' ? "contained" :"outlined"}
            color="primary"
            style={{color: this.state.selected === 'save' ? 'white' : '#f57c00' }}
            onClick={() => this.selectOption('save')}
          >
            Apply it towards my next Shopping List
          </Button>
          <Button
            variant={this.state.selected === 'charity' ? "contained" :"outlined"}
            color="primary"
            style={{color: this.state.selected === 'charity' ? 'white' : '#f57c00' }}
            onClick={() => this.selectOption('charity')}
          >
            Donate to Charity
          </Button>
          <Button
            variant={this.state.selected === 'restaurant' ? "contained" :"outlined"}
            color="primary"
            style={{color: this.state.selected === 'restaurant' ? 'white' : '#f57c00' }}
            onClick={() => this.selectOption('restaurant')}
          >
            Purchase Local Restaurant Giftcards
          </Button>

        </div>
        <div style={{margin: '40px 0'}}>
          {this.state.selected === 'charity' ? charityList : null}
          {this.state.selected === 'restaurant' ? restaurantList : null}
        </div>
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
