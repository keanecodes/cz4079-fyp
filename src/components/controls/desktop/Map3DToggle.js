import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Map3DToggle() {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedC: true,
  });
  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <div className={classes.root}>
      {"Map View"}
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>2D</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
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

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 52,
    height: 28,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(22px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: "#05BDD9",
        borderColor: "#05BDD9",
      },
    },
  },
  thumb: {
    width: 22,
    height: 22,
    margin: 2,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 28 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);