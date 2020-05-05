/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";

import AboutPage from "./AboutPage";
import { OrderStatus } from "./pages/OrderStatus/OrderStatus.js";
import { CurateShoppingList } from "./pages/CurateShoppingList/CurateShoppingList.js";
import { ShoppingComplete } from "./pages/ShoppingComplete/ShoppingComplete.js";
import { NewShoppingList } from "./pages/NewShoppingList/NewShoppingList.js";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/new-shopping-list" activeStyle={activeStyle}>New List</NavLink>
          {' | '}
          <NavLink to="/curate-shopping-list" activeStyle={activeStyle}>Curate List</NavLink>
          {' | '}
          <NavLink to="/shopping-list-status" activeStyle={activeStyle}>List status</NavLink>
          {' | '}
          <NavLink to="/order-complete" activeStyle={activeStyle}>Order Complete</NavLink>

        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/new-shopping-list" component={NewShoppingList} />
          <Route path="/curate-shopping-list" component={CurateShoppingList} />
          <Route path="/shopping-list-status" component={OrderStatus} />
          <Route path="/order-complete" component={ShoppingComplete} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
