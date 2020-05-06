/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";

import OrderStatus from "./pages/OrderStatus/OrderStatus.js";
import CurateShoppingList from "./pages/CurateShoppingList/CurateShoppingList.js";
import ShoppingComplete from "./pages/ShoppingComplete/ShoppingComplete.js";
import NewShoppingList from "./pages/NewShoppingList/NewShoppingList.js";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import HoneyHeader from './HoneyHeader';
import HoneyFooter from './HoneyFooter';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[700]
    },
    primary: {
      main: orange[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"proxima-nova"',
      'sans-serif'
    ].join(',')
  }
});

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  propTypes = {
    children: PropTypes.element
  };

  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <ThemeProvider theme={theme}>
          <div className={'header'}>
            <HoneyHeader />
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
          <HoneyFooter />
        </ThemeProvider>
      </div>
    );
  }
}

export default hot(module)(App);
