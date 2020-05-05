import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Honey Sweet Budget</h1>

      <h2>How it works</h2>
      <ol>
        <li>Create a shopping list, adding essential items that you need.</li>
        <li>Select your price point, and curate which items you would be willing to purchase.</li>
        <li>Pre-pay for your shopping list - cancel at any time for a refund on items which have not already been purchased.</li>
        <li>Let Honey do the rest! We will continuously track the price of the items in your shopping cart and complete the purchase when items fall below your price point.</li>
        <li>Choose what to do with your savings!</li>
      </ol>

      <Link to="/new-shopping-list">Get Started!</Link>

    </div>
  );
};

export default HomePage;
