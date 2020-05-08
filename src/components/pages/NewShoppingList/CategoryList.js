import React from "react";
import withStyles from "@material-ui/styles/withStyles";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  gridList: {
    width: '100%',
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  whiteText: {
    color: "white"
  },
  image: {
    width: 75,
    height: 75,
    margin: '16px auto',
    objectFit: 'contain'
  },
});

const CategoryList = ({classes, items, assets, onClick}) => (
  <div>
    <Grid container
    spacing={2}
    justify="center"
    className={classes.gridList}>
      {items.map((item) =>
        <Grid item md key={item.category}>
          <Paper className={classes.card}>
            <div className={classes.box}>
              <Typography style={{ textTransform: "uppercase" }}
              color="secondary"
              gutterBottom>
                {item.name}
              </Typography>
              <img className={classes.image} src={assets[item.category]}/>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button color="primary"
              variant="contained"
              className={classes.actionButtom}
              disabled={item.inCart}
              onClick={() => onClick(item, (quantity) => quantity + 1)}>
                <div className={classes.whiteText}>Add</div>
              </Button>
            </div>
          </Paper>
        </Grid>
      )}
    </Grid>
  </div>
)

export default withStyles(styles)(CategoryList);
