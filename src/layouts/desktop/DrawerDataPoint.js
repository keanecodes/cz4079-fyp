import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TabDrawer from 'components/TabDrawer'

export default function DrawerDataPoint() {
  const classes = useStyles()
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
        <div className={classes.dataCardContainer}>
          {[...Array(10)].map(i => <DataCard key={`datapoint-${i}`}/>)}
        </div>
      </TabDrawer>
    </>
  )
}

const DataCard = () => {
  const classes = useStyles()
  return (
    <div className={classes.dataCard}>
      <p className="txt-title">154 Serangoon NTH AVE 1</p>
      <small className="txt-subtitle">3-room</small>
      <p><small className="txt-highlight">S$348,000</small></p>
      <div className="txt-details-container">
        <span><small>New Generation Model</small></span>
        <span className="dot">·</span>
        <span><small>40sqm</small></span>
        <span className="dot">·</span>
        <span><small>40 years and 04 months Remaining</small></span>
      </div>
    </div>
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
      marginBottom: '1rem',
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
  },
  dataCardContainer: {
    height: 'calc(100vh - 15rem)',
    overflowY: 'scroll',
    marginRight: '-0.2rem',
    paddingRight: '0.3rem'
  },
  dataCard: {
    width: 'calc(100% - 1rem)',
    height: '10vh',
    overflow: 'hidden',
    background: 'white',
    borderRadius: '5px',
    color: 'var(--black-txt)',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    '& p, & small': {
      margin: '0.2rem 0'
    },
    '& .txt-title': {
      fontSize: '0.8rem',
      fontWeight: 800,
    },
    '& .txt-subtitle': {
      fontWeight: 700,
    },
    '& .txt-highlight': {
      fontStyle: 'italic',
      color: 'var(--blue-highlight)',
      fontWeight: 500,
    },
    '& .txt-details-container': {
      fontSize: '0.6rem',
      marginTop: '0.3rem'
    },
    '& .dot': {
      fontSize: '1rem',
      lineHeight: '0.1rem',
      margin: '0 0.35rem'
    },
  }
}))