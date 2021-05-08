import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles';

export default function DrawerDataPoint() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(true)

  const toggleDrawerOpen = () => setOpen(!open)

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <span className={classes.separator}></span>
          <div 
            onClick={toggleDrawerOpen}
            className={classes.drawerTrigger}
          >
            [{`${open ? 'Hide': 'Show'}`}] Data Points
          </div>
          <div className={classes.sortBar}>
            <p className='sortBar__title'>SORT BY</p>
            <div className='sortBar__option'>
              A to Z
              <span className={classes.arrow}>&#62;</span>
            </div>
          </div>
        </div>
        
      </Drawer>
    </>
  )
}

const drawerWidth = `20vw`

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    marginTop: '2rem',
    flexShrink: 0,
    zIndex: 1,
  },
  drawerPaper: {
    top: '4rem',
    width: drawerWidth,
    height: `calc(100% - 8rem)`,
    padding: '1rem',
    overflowY: 'visible',
    background: 'var(--dark-background)',
    color: 'white'
  },
  drawerContainer: {
    overflow: 'visible',
  },
  separator: {
    width: 'calc(100% + 2rem)',
    marginLeft: '-1rem',
    marginTop: '-1rem',
    height: '0.3rem',
    background: 'var(--blue-highlight)',
    display:'block',
    zIndex: 10,
  },
  drawerTrigger: {
    position: 'relative',
    transformOrigin: 'right',
    transform: 'rotate(90deg)',
    right: '-11.5rem',
    top: 'calc(10rem)', //TODO: find heuristic calculation 
    height: '2rem',
    width: '55%',
    cursor: 'pointer',
    userSelect: 'none',
    visibility: 'visible',
    background: 'var(--dark-highlight)',
    color: 'white',
    textAlign: 'center',
    borderRadius: '0.3rem 0.3rem 0 0',
  },
  sortBar: {
    marginTop: '-2rem',
    '& .sortBar__title': {
      fontSize: '12.8px',
      fontSpacing: '0.75px',
      display: 'block',
      paddingBottom: '10px',
      fontWeight: '700',
    },
    '& .sortBar__option': {
      marginTop: '-0.5rem',
      border: '2px solid var(--blue-highlight)',
      borderRadius: '5px',
      padding: '10px 0 10px 10px',
      cursor: 'not-allowed !important',
      overflowY: 'hidden' 
    },
  },
  arrow: {
    height: '3rem',
    width: '2.75rem',
    position: 'absolute',
    right: '1.1rem',
    marginTop: '-0.9rem',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '3rem', 
    padding: 0,
    transform: 'rotate(90deg)',
    backgroundColor: 'var(--blue-highlight)',
    borderRadius: '5px 5px 0 0',
    content: ' > ',
  }
}))