import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AntSwitch from 'components/Switch'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Map3DToggle({show3D, handleChange}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {"Map View"}
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>2D</Grid>
          <Grid item>
            <AntSwitch checked={show3D} onChange={handleChange} name="show3D" />
          </Grid>
          <Grid item>3D</Grid>
        </Grid>
      </Typography>
    </div>
  )
}


const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    margin: 'auto',
    color: 'var(--grey-unselect)',
  },
}));