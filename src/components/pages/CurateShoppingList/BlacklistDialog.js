import React from 'react';
import withStyles from '@material-ui/styles/withStyles';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import BaseDialog from './BaseDialog';

const styles = theme => ({
  container: {
    maxWidth: 600,
    maxHeight: 600,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "left",
    alignItems: "center",
    color: theme.palette.text.secondary
  },
  overflowTextWrapper: {
    textOverflow: 'ellipsis', 
    maxWidth: 271, 
    overflow: 'hidden'
  }
});

const BlacklistDialog = ({ classes, allowedItems, blacklistDialog, blacklistProduct, item, onClose}) => {
  console.log("BLACKLIST", blacklistDialog);
  return (<BaseDialog open={blacklistDialog} onClose={onClose}>
    <div className={classes.container}>
      {allowedItems.map(product => (
        <Paper className={classes.paper}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={2}>
              <img src={product.image_url_primary}
                  style={{height: '60px', width: '60px', position: 'relative', margin: 'auto', left: '15%'}}/>
            </Grid>
            <Grid item xs={7} >
              <p className={classes.overflowTextWrapper}>
                {product.title}
              </p>
            </Grid>
            <Grid item xs={2}>
              ${parseFloat(product.price_current) / 100}
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="delete" onClick={() => blacklistProduct(product, item.category)}>
                <DeleteIcon color="primary"/>
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        )
      )}
    </div>
  </BaseDialog>)
}

export default withStyles(styles)(BlacklistDialog);
