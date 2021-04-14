import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

export default function FilterOption({name, control}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {name}
      {control === 'dropdown' && 
        name === 'Property' 
        ? (<select>
          <option>HDB</option>
          <option>Condo</option>
          <option>Landed</option>
          <option>Terrace</option>
        </select>) 
        : name === 'Bedrooms' 
        ? (<select>
          <option>3-room</option>
          <option>4-room</option>
          <option>5-room</option>
        </select>) 
        : name === 'Prices' 
        && (<select>
          <option>150k-250k</option>
          <option>250k - 500k</option>
          <option>more than 500k</option>
        </select>) 
      }
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 1rem',
    borderTop: '5px var(--dark-background) solid',
    color: 'var(--grey-unselect)',
    fontWeight: '600',
    fontSize: '0.85rem',
    letterSpacing: '0.025rem',
    transition: 'all 0.35s',
    '&:hover, &:active': {
      borderTop: '5px var(--blue-highlight) solid',
    },
    '& select': {
      marginTop: '0.5rem',
      border: 'none',
      borderRadius: '0.2rem',
      borderStyle: 'none',
      fontSize: '0.9rem',
      letterSpacing: '0.025rem',
      backgroundColor: 'transparent',
      color: 'var(--blue-highlight)',
      fontWeight: '600',
      outlineColor: 'transparent',
      transition: 'all ease-in-out 0.15s',
      '&:focus, &:active': {
        outline: 'none',
        border: 'none',
      }
    }
  },
}));
