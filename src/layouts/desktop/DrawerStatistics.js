import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles';

export default function DrawerStatistics() {
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
        anchor="right"
      >
        <div className={classes.drawerContainer}>
          <span className={classes.separator}></span>
          <div 
            onClick={toggleDrawerOpen}
            className={classes.drawerTrigger}
          >
            Area Statistics [{`${open ? 'Hide': 'Show'}`}] 
          </div>
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
    overflow: 'visible',
  },
  separator: {
    width: '100%',
    height: '0.3rem',
    background: 'var(--blue-highlight)',
    display:'block',
    zIndex: 10,
  },
  drawerTrigger: {
    position: 'relative',
    transformOrigin: 'right',
    transform: 'rotate(270deg)',
    right: `calc(100% - ${triggerWidth} + ${triggerHeight} - 1rem)`,
    top: 'calc(-1.5rem)',
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