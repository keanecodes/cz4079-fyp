import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TabDrawer from 'components/TabDrawer'

export default function DrawerDataPoint() {

  return (
    <>
      <TabDrawer
        width='20vw'
        triggerTagLocation='start'
        triggerName='Data Points'
        triggerHeight= '2rem'
        triggerWidth='50%'
        styleSeparator={style.separator}
        styleTrigger={style.trigger}
      >
        <SortBar/>
      </TabDrawer>
    </>
  )
}

const SortBar = () => {
  const classes = useStyles()
  return (
    <div className={classes.sortBar}>
      <p className='sortBar__title'>SORT BY</p>
      <div className='sortBar__option'>
        A to Z
        <span className={classes.arrow}>&#62;</span>
      </div>
    </div>
  )
}

const style = {
  trigger: {
    transform: 'rotate(90deg)',
    right: '-12.5rem',
    top: 'calc(10rem)', //TODO: find heuristic calculation 
    marginTop: '-1rem',
  },
  separator: {
    width: 'calc(100% + 2rem)',
  }
}

const useStyles = makeStyles(() => ({
  sortBar: {
    marginTop: '-1rem',
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