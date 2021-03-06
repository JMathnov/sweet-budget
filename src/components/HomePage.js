import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from '@honeyscience/honey-ui-toolkit';
import * as coinyWave from '../assets/coiny-wave.png'
const styles = {
  wrapper: {
    padding: '30px 160px 0',
    marginBottom: 100
  },
  h1: {
    color: '#292a2a',
    margin: '40px 0px',
    fontSize: '34px',
    textAlign: 'center',
  },
  h2: {
    fontSize: '28px',
  },
  list: {
    fontSize: '20px',
    lineHeight: '1.25em',
    marginBottom: '40px',
    fontWeight: 400
  },
  listItem: {
    marginBottom: 8
  },
  coinyImg: {
    height: '75px',
    width: '150px',
    position: 'absolute',
    top: '500px',
    right: '500px',
    objectFit: 'contain',
  }
};

const HomePage = () => {
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.h1}>Sweet Budgets</h1>
      <img src={coinyWave} style={styles.coinyImg}/>

      <h2 style={styles.h2}>How it works</h2>
      <ol style={styles.list}>
        <li style={styles.listItem}>Create a shopping list, adding the essential items that you need.</li>
        <li style={styles.listItem}>Select your price point, and curate which items you would be willing to purchase.</li>
        <li style={styles.listItem}>Pre-pay for your shopping list - cancel at any time for a refund on items which have not already been purchased.</li>
        <li style={styles.listItem}>Let Honey do the rest! We will continuously track the price of the items in your shopping cart and complete the purchase when items fall below your price point.</li>
        <li style={styles.listItem}>Choose what to do with your savings!</li>
      </ol>

      <Link to="/new-shopping-list">
        <Button copy="Get Started!" />
      </Link>
    </div>
  );
};

export default HomePage;
