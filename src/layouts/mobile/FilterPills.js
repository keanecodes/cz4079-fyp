import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export default function FilterPills() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <button className={classes.pill}>Property</button>
      <button className={classes.pill}>Bedrooms</button>
      <button className={classes.pill}>Price</button>
      <button className={classes.pill}>MRT</button>
      <button className={classes.pill}>Year</button>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  pill: {
    flex: 1,
    borderRadius: '25px',
    border: 'none',
    width: '1rem',
    height: '3rem',
    margin: '0.1rem',
    backgroundColor: 'white',
  }
}));
