import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles';

export default function DrawerStatistics() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

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
        anchor="right"
      >
        <div className={classes.drawerContainer}>
          
        </div>
        <div 
          onClick={toggleDrawerOpen}
          className={classes.drawerTrigger}
        >
          Area Statistics [{`${open ? 'Hide': 'Show'}`}] 
        </div>
      </Drawer>
    </>
  )
}

const drawerWidth = `25vw`
const triggerHeight = '2rem'
const triggerWidth = '50%'

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
    transform: 'rotate(270deg)',
    right: `calc(100% - ${triggerWidth} + ${triggerHeight} - 1rem)`,
    top: 'calc(-1rem)',
    height: triggerHeight,
    width: triggerWidth,
    cursor: 'pointer',
    userSelect: 'none',
    visibility: 'visible',
    background: 'var(--dark-highlight)',
    color: 'white',
    textAlign: 'center',
    borderRadius: '0.3rem 0.3rem 0 0',
  }
}))