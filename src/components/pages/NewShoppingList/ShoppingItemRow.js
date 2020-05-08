import React from "react";
import withStyles from "@material-ui/styles/withStyles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { textAlign } from "@material-ui/system";

const styles = theme => ({
  shoppingRow: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: 'column',
    marginBottom: 16
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 200
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-around',
    paddingBottom: 24,
    borderBottom: '1px solid rgba(0, 0, 0, 0.26)'
  },
  itemInfo: {
    marginLeft: 0,
    textAlign: 'left',
  },
  infoText: {
    marginRight: 0
  },
  image: {
    width: 75,
    height: 75,
    objectFit: 'contain'
  }
});

const ShoppingItemRow = ({classes, item, assets, adjust}) => (
  <div className={classes.shoppingRow}>
    <div className={classes.info}> 
      <img className={classes.image} src={assets[item.category]}/>
      <div className={classes.infoText}>
        <Typography className={classes.itemInfo} variant="body1">{item.name}</Typography>
        <Typography className={classes.itemInfo} variant="body2">x{item.quantity}</Typography>
      </div>
    </div>
    <div className={classes.buttons}>
    <Button
    variant="outlined"
    color="primary"
    size="small"
    onClick={() => adjust(item, (quantity) => quantity - 1)}>-</Button>
    <Button
    variant="outlined"
    color="primary"
    size="small"
    onClick={() => adjust(item, (quantity) => quantity + 1)}>+</Button>
    </div>
  </div>
)

export default withStyles(styles)(ShoppingItemRow);
