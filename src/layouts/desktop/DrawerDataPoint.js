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
          
        </div>
        <div 
          onClick={toggleDrawerOpen}
          className={classes.drawerTrigger}
        >
          [{`${open ? 'Hide': 'Show'}`}] Data Points
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
    overflowY: 'visible',
    background: 'var(--dark-background)',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerTrigger: {
    position: 'relative',
    transformOrigin: 'right',
    transform: 'rotate(90deg)',
    right: '-10.5rem',
    top: 'calc(10.5rem)', //TODO: find heuristic calculation 
    height: '2rem',
    width: '55%',
    cursor: 'pointer',
    userSelect: 'none',
    visibility: 'visible',
    background: 'var(--dark-highlight)',
    color: 'white',
    textAlign: 'center',
    borderRadius: '0.3rem 0.3rem 0 0',
  }
}))