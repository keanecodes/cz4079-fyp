import React from 'react'
import TabDrawer from 'components/TabDrawer'
import { UIdrawerStatOpen } from 'data/recoil'
import { selectedGeojsonArea } from 'data/recoil'
import { useRecoilValue } from 'recoil'
import { makeStyles } from '@material-ui/core'
import { mapData } from 'data/recoil'
import { Line } from "react-chartjs-2"
import _ from "lodash"
import { mapOriginalData } from 'data/recoil'

export default function DrawerStatistics() {
  const classes = useStyles()
  const selectedArea = useRecoilValue(selectedGeojsonArea)
  const originalData = useRecoilValue(mapOriginalData)
  const data = useRecoilValue(mapData)
  
  // get room count
  const count = {}
  // eslint-disable-next-line
  Array("1 ROOM", "2 ROOM", "3 ROOM", "4 ROOM", "5 ROOM", "EXECUTIVE").map(r => count[r] = 0)
  data.map(d => count[d.room] += 1)

  //get tri-yearly growth
  const growth = {}
  _.range(1990, 2023, 3).map(y => growth[y] = 0)
  _.range(1990, 2023, 3).map(y => 
    originalData
      .filter(d => d.town === selectedArea?.PLN_AREA_N)
      .filter(d => new Date(d.timestamp).getFullYear() === y)
      .map(d => growth[y] += d.resale_price)
  )
  _.range(1990, 2023, 3).map(y => growth[y] /= data.length)

  const dashboardActiveCountriesCard = {
    data: canvas => {
      var ctx = canvas.getContext("2d");
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#2CA8FF");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, hexToRGB("#2CA8FF", 0.4));
  
      return {
        labels: Object.keys(growth),
        datasets: [
          {
            label: "Every 3 Years (1990 - 2020)",
            backgroundColor: gradientFill,
            borderColor: "#2CA8FF",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#2CA8FF",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 2,
            data: Object.keys(growth).length > 0
              ? Object.values(growth)
              : Array(2020 - 1990).fill(0)
          }
        ]
      };
    },
    options: gradientChartOptionsConfiguration
  };
    
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
        <div className={classes.statDrawerContainer}>
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
              <div className={classes.graphContainer}>
                <small>AVERAGE RESALE PRICE GROWTH</small>
                <Line
                  data={dashboardActiveCountriesCard.data}
                  options={dashboardActiveCountriesCard.options}
                  id="chart-points"
                />
              </div>
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
        </div>
      </TabDrawer>
    </>
  )
}

const chartColor = "#001529";
const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

const gradientChartOptionsConfiguration = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        display: 0,
        ticks: {
          display: false,
          maxTicksLimit: 5
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        display: 0,
        ticks: {
          display: false
        },
        gridLines: {
          zeroLineColor: "transparent",
          drawTicks: false,
          display: false,
          drawBorder: false
        }
      }
    ]
  },
  layout: {
    padding: { left: 0, right: 0, top: 15, bottom: 15 }
  }
};

const style = {
  separator: {
    width: 'calc(100% + 2rem)',
    marginRight: '-1rem',
  }
}

const useStyles = makeStyles(() => ({
  statDrawerContainer: {
    height: '99%',
    overflowY: 'scroll',
    marginTop: '-1rem'
  },
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
    height: '20rem',
    color: 'white',
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
      overflow: 'hidden',
    }
  }
}))
