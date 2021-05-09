import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState } from 'recoil'

export default function TabDrawer({
  state,
  width, 
  anchor,
  triggerTagLocation,
  triggerName,
  triggerHeight, 
  triggerWidth,
  styleSeparator,
  styleTrigger,
  children
}) {
  const useStyles = makeStyles(() => ({
    drawer: {
      width: width,
      marginTop: '2rem',
      flexShrink: 0,
      zIndex: 1,
      color: 'white'
    },
    drawerPaper: {
      top: '4rem',
      width: width,
      height: `calc(100% - 8rem)`,
      overflowY: 'visible',
      background: 'var(--dark-background)',
      padding: '1rem',
      color: 'white',
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
      marginTop: '-1rem',
      marginLeft: '-1rem',
      ...styleSeparator
    },
    drawerTrigger: {
      position: 'relative',
      transformOrigin: 'right',
      transform: 'rotate(270deg)',
      right: `calc(100% - ${triggerWidth} + ${triggerHeight})`,
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
      ...styleTrigger
    }
  }))
  const [open, setOpen] = useRecoilState(state);
  const toggleDrawerOpen = () => setOpen(!open)
  const classes = useStyles()

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchor}
      >
        <div className={classes.drawerContainer}>
          <span className={classes.separator}></span>
          <div 
            onClick={toggleDrawerOpen}
            className={classes.drawerTrigger}
          >
            {triggerTagLocation === 'start' && `[${open ? 'Hide': 'Show'}] ` }
            {triggerName} 
            {triggerTagLocation === 'end' && `[${open ? 'Hide': 'Show'}]` }
          </div>
          {children}
        </div>
      </Drawer>
    </>
  )
}

