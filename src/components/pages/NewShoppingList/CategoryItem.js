import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  card: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  gridList: {
    width: '100%',
    height: 800,
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
});

const CategoryList = ({classes, categories, onClick}) => (
  <div>
    <Grid container spacing={2} justify="center" className={classes.gridList}>
      {categories.map((category) =>
        <Grid item md>
          <Paper className={classes.card}>
            <div className={classes.box}>
              <Typography style={{ textTransform: "uppercase" }} color="secondary" gutterBottom>
                Toilet Paper
              </Typography>
              <Typography variant="body2" gutterBottom>
                A first title style <br /> with two lines
              </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button color="primary" variant="contained" className={classes.actionButtom} onClick={onClick}>
                Add
              </Button>
            </div>
          </Paper>
        </Grid>
      )}
    </Grid>
  </div>
)

const CategoryItem = ({classes}) => (
  <div>
    <Paper className={classes.card}>
      <div className={classes.box}>
        <Typography style={{ textTransform: "uppercase" }} color="secondary" gutterBottom>
          Toilet Paper
        </Typography>
        <Typography variant="body2" gutterBottom>
          A first title style <br /> with two lines
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button color="primary" variant="contained" className={classes.actionButtom}>
          Add
        </Button>
      </div>
    </Paper>
  </div>
)

export default withStyles(styles)(CategoryItem);
