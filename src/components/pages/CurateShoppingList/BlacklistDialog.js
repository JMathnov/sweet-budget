import React from 'react';
import withStyles from '@material-ui/styles/withStyles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import BaseDialog from './BaseDialog';
import blacklistIcon from '../../../assets/blacklist-icon.png';

const styles = theme => ({
  container: {
    maxWidth: 600,
    maxHeight: 600,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  stepsContainer: {
    marginLeft: 72,
    textAlign: 'left',
    marginTop: 20,
    height: 65
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "left",
    alignItems: "center",
    color: theme.palette.text.secondary
  },
  bottomMargin: {
    marginBottom: theme.spacing(2)
  }
});

const BlacklistDialog = ({ classes, allowedItems, blacklistDialog, blacklistProduct, item, onClose}) => (
  <BaseDialog open={blacklistDialog} onClose={onClose}>
    <div className={classes.container}>
      {allowedItems.map(product => (
        <Paper className={classes.paper}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={2}>
              <img src={product.image_url_primary}
                  style={{height: '60px', width: '60px', position: 'relative', margin: 'auto', left: '15%'}}/>
            </Grid>
            <Grid item xs={7}>
              {product.title}
            </Grid>
            <Grid item xs={2}>
              ${parseFloat(product.price_current) / 100}
            </Grid>
            <Grid item xs={1}>
              <img
                src={blacklistIcon}
                style={{height: '40px', width: '40px', cursor: 'pointer'}}
                onClick={() => blacklistProduct(product, item.category)}/>
            </Grid>
          </Grid>
        </Paper>
        )
      )}
    </div>
  </BaseDialog>
)

export default withStyles(styles)(BlacklistDialog);
