import React from 'react'
import { FiMap, FiBarChart2, FiChevronUp, FiMenu, FiBookmark, FiSettings } from "react-icons/fi";
import { makeStyles } from '@material-ui/core/styles'

export default function TabBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <button className={classes.item}> <FiMap/> Map </button>
      <button className={classes.item}> <FiBarChart2/> Charts </button>

      <button className={classes.pull}>
        <FiChevronUp />
        <br />
        <FiMenu />
      </button>

      <button className={classes.item}> <FiBookmark/> Highlights </button>
      <button className={classes.item}> <FiSettings /> Settings </button>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '3.8rem',
    backgroundColor: 'white',
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    border: 'none',
    backgroundColor: 'white',
    '& svg': {
      fontSize: '1.5rem',
      margin: '0.5rem 0.1rem',
    }
  },
  pull: {
    flex: 0.5,
    position: 'relative',
    bottom: '2rem',
    border: 'none',
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: '6px 10px 35px 0px rgba(225,225,225,0.5)',
    '& svg:nth-child(3)': {
      fontSize: '1.2rem',
    }
  }
}));
