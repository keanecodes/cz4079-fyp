import React from 'react'
import TabDrawer from 'components/TabDrawer'
import { UIdrawerStatOpen } from 'data/recoil'
import { selectedGeojsonArea } from 'data/recoil'
import { useRecoilValue } from 'recoil'
import { makeStyles } from '@material-ui/core'
import { mapData } from 'data/recoil'

export default function DrawerStatistics() {
  const classes = useStyles()
  const selectedArea = useRecoilValue(selectedGeojsonArea)
  const data = useRecoilValue(mapData)
  const count = {
    "1 ROOM": 0,
    "2 ROOM": 0,
    "3 ROOM": 0,
    "4 ROOM": 0,
    "5 ROOM": 0,
    "EXECUTIVE": 0,
  }

  data.map(d => count[d.room] += 1)
  
  console.log(Object.entries(count).filter(c => c[1] > 0))
  return (
    <>
      <TabDrawer
        state={UIdrawerStatOpen}
        width='25vw'
        anchor='right'
        triggerTagLocation='end'
        triggerName='Area Statistics '
        triggerHeight='2rem'
        triggerWidth='50%'
        styleSeparator={style.separator}
      >
        <h1 className={classes.areaTitle}>{selectedArea?.PLN_AREA_N}</h1>
        <div className={classes.detailsContainer}>
          <div>
            <small>REGION</small>
            <strong><p>{selectedArea?.REGION_N.replace(/\w+[.!?]?$/, '')}</p></strong>
          </div>
          <div>
            <small>AREA</small>
            <p style={{marginTop: '0.3rem'}}>
              <strong>{(parseInt(selectedArea?.SHAPE_Area) / 1000000).toFixed(2)}</strong>KM
              <sup>2</sup>
            </p>
          </div>
          <div>
            <small>PRICE RANK</small>
            <p><strong>0</strong>/52</p>
          </div>
        </div>
        {data.length > 0 
        ? <>
            {/* <div className={classes.graphContainer}>
              <small>RESALE PRICE GROWTH</small>
            </div> */}
            <div className={classes.lineChartContainer}>
              <h2>Top Resale Units Types</h2>
              {Object
                .entries(count)
                .filter(c => c[1] > 0)
                .map(room => {
                  return (
                    <div className={classes.lineChartCont} key={`${room[0]}-${room[1]}`}>
                      <p className="">{`${room[0]}` }</p>
                      <div className={classes.lineChart}>
                        <div style={{width: `calc(${(room[1] / data.length * 100).toFixed(0)}% - 2rem`}}>{room[1]} Units</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </>
          : <center><p>This area has no HDB Resale Unit <br/>for current filter selections.</p></center>
        }
      </TabDrawer>
    </>
  )
}

const style = {
  separator: {
    width: 'calc(100% + 2rem)',
    marginRight: '-1rem',
  }
}

const useStyles = makeStyles(() => ({
  areaTitle: {
    marginTop: 0,
    fontSize: '1.7rem',
    fontWeight: 600,
  },
  detailsContainer: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-around',
    '& p': {
      fontSize: '1.2rem',
      marginTop: '0.6rem'
    },
  },
  graphContainer: {
    textAlign: 'center',
  },
  lineChartContainer: {
    '& h2': {
      fontSize: '1.4rem',
      fontWeight: 400,
    },
  },
  lineChartCont: {
    marginBottom: '1rem',
    '& p': {
      marginBottom: '0.5rem',
      fontSize: '0.8rem'
    }
  },
  lineChart: {
    width: '100%', 
    height: '1rem',
    background: 'white',
    borderRadius: '1rem',
    '& div': {
      background: 'var(--blue-icon-select)', 
      height: '1rem',
      borderRadius: '1rem',
      color: 'black',
      fontSize: '0.8rem',
      padding: '0 1rem',
    }
  }
}))
