import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export default function Timeline() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <button>&#9654;</button>
      <div className={classes.timeline}>Timeline</div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '4rem',
    backgroundColor: 'white',
    color: 'var(--dark-background)',
    display: 'grid',
    gridTemplateColumns: 'minmax(50px, 5%) auto',
    textAlign: 'center',
    borderTop: '1px var(--grey-border) solid',
    '&>*': {
      margin: 'auto 0',
    }, 
    '& button': {
      border: 'none',
      borderRadius: '50%',
      height: '3rem',
      width: '3rem',
      margin: '0.5rem',
    },
  },
  timeline: {
    backgroundColor: 'aquamarine',
    margin: 'auto 1rem',
  }
}));