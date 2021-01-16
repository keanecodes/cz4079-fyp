import React from 'react';
import Button from '@material-ui/core/Button'
import { FiMenu } from "react-icons/fi";
import { makeStyles } from '@material-ui/core/styles';

export default function FilterPopup() {
  const classes = useStyles();

  return (
    <>
      <Button 
        startIcon={<FiMenu className={classes.icon} />}
        className={classes.button}
        disableRipple> 
        {'More'}
    </Button>
    </>
  )
}

const useStyles = makeStyles(() => ({
  button: { 
    textAlign: 'center',
    color: 'var(--grey-unselect)',
    fontWeight: 600,
    transition: 'all ease-in-out 0.15s',
    marginLeft: '-0.8rem',
    marginBottom: '-0.4rem',
    '&:hover': {
      color: 'var(--blue-highlight)',
      cursor: 'pointer',
    },
    '& span': {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0,
    },
  },
  icon: {
    fontSize: '1.5rem',    
  }
}));