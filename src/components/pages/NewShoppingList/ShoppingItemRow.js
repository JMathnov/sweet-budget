import React from "react";
import withStyles from "@material-ui/styles/withStyles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { textAlign } from "@material-ui/system";

const styles = theme => ({
  shoppingRow: {
    display: "flex",
    alignItems: "center",
    textAlign: "center"
  },
  itemInfo: {
    marginLeft: 10
  }
});

const ShoppingItemRow = ({classes, item, adjust}) => (
  <div className={classes.shoppingRow}>
    <Button
    variant="outlined"
    color="primary"
    size="small"
    onClick={() => adjust(item, (quantity) => quantity + 1)}>+</Button>
    <Button
    variant="outlined"
    color="primary"
    size="small"
    onClick={() => adjust(item, (quantity) => quantity - 1)}>-</Button>
    <Typography className={classes.itemInfo} variant="body1">x{item.quantity} {item.name}</Typography>
  </div>
)

export default withStyles(styles)(ShoppingItemRow);
