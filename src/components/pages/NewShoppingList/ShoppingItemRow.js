import React from "react";
import withStyles from "@material-ui/styles/withStyles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  shoppingRow: {
    display: "inline"
  }
});

const ShoppingItemRow = ({classes, item, adjust}) => (
  <div>
    <Button
    variant="outlined"
    color="primary"
    onClick={() => adjust(item, (quantity) => quantity + 1)}>+</Button>
    <Button
    variant="outlined"
    color="primary"
    onClick={() => adjust(item, (quantity) => quantity - 1)}>-</Button>
    <div>x{item.quantity}</div>
    <div>{item.name}</div>
  </div>
)

export default withStyles(styles)(ShoppingItemRow);
