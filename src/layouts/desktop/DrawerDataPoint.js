import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TabDrawer from 'components/TabDrawer'
import { useRecoilValue } from 'recoil'
import { 
  mapData,
  UIdrawerDataPointOpen 
} from 'data/recoil'

export default function DrawerDataPoint() {
  const classes = useStyles()
  const data = useRecoilValue(mapData)
  
  return (
    <>
      <TabDrawer
        state={UIdrawerDataPointOpen}
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
          {data.slice(0,50).map((d,i) => <DataCard key={`datapoint-${i}`} data={d}/>)}
        </div>
      </TabDrawer>
    </>
  )
}

const DataCard = ({data}) => {
  const classes = useStyles()
  
  return (
    <div className={classes.dataCard}>
      <p className="txt-title">{data.address}</p>
      <small className="txt-subtitle">{data.room}</small>
      <p><small className="txt-highlight">S${data.resale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</small></p>
      <div className="txt-details-container">
        <span><small>{data.flat_model} Model</small></span>
        <span className="dot">·</span>
        <span><small>{data.floor_area_sqm} sqm</small></span>
        <span className="dot">·</span>
        <span><small>{data.lRemain} remaining </small></span>
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
    top: 'calc(10rem)', //TODO: find heuristic calc
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
    height: '90%',
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
      fontSize: '0.7rem',
      marginTop: '0.3rem'
    },
    '& .dot': {
      fontSize: '1rem',
      lineHeight: '0.1rem',
      margin: '0 0.35rem'
    },
  }
}))