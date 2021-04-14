import React, { useState, useEffect, useMemo } from 'react';
import { render } from 'react-dom';
import MapboxGLMap from 'layouts/common/Map'

import FilterPills from 'layouts/mobile/FilterPills'
import FilterBar from 'layouts/desktop/FilterBar';
import Timeline, { getTimeRange } from 'layouts/desktop/Timeline'
import TabBar from 'layouts/mobile/TabBar';
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core/styles';
import resales from 'data/resale1990_2020onwards.csv'
// import { layerData } from 'data/recoil/layers'
// import { useRecoilState } from 'recoil'
import { RecoilRoot } from 'recoil'


const DATA_URL = resales

export default function App({data}) {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 767, orientation: "portrait"})

  const [state, setState] = useState({
    show3D: false,
    // data: null
  });

  const [filter, setFilter] = useState(null)
  // const [ data, setLayerData] = useRecoilState(layerData)
  
  useEffect(() => {
    require('d3-request').csv(DATA_URL, (error, response) => {
      if (!error) {
        const data = response.map(row => ({
          timestamp: new Date(`${row.month}`).getTime(),
          latitude: Number(row.latitude),
          longitude: Number(row.longitude),
          resale_price: Number(row.resale_price),
          floor_area_sqm: Number(row.floor_area_sqm)
        }));
        // setState(s => ({...s, data}))
        
        render(<RecoilRoot><App data={data} /></RecoilRoot>, document.getElementById('root'));
        // setLayerData(layerData)
      }
    });
  }, [state])

  const timeRange = useMemo(() =>  getTimeRange(data), [data]);
  const filterValue = filter || timeRange;

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.checked });
  };

  return (
    <>
      {data && (
        <div className={classes.App}>
          { !isMobile && <div className="section header"> <FilterBar show3D={state.show3D} handleChange={handleChange} /> </div>}
          <main className="content">
            <MapboxGLMap data={data} filterValue={filterValue} show3D={state.show3D}/>
            {isMobile && <FilterPills/>}
          </main>
          <footer className="footer" >
            {/* { isMobile ? <TabBar/> : (timeRange && (<Timeline data={data} value={filterValue} min={timeRange[0]} max={timeRange[1]} onChange={setFilter}/>)) } */}
            { isMobile ? <TabBar/> : (timeRange && (
              <Timeline 
                min={timeRange[0]}
                max={timeRange[1]}
                value={filterValue}
                onChange={setFilter}
              />
            ))}
          </footer>
        </div>
      )}
    </>
  );
}

const useStyles = makeStyles(() => ({
  App: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    '& .section': { fontSize: '1rem' },
    '& .header, & .footer': {
      flex: '1',
      height: '100%',
      width: '100%',
      background: 'var(--dark-background)',
      zIndex: 1,
    },
    '& .footer': { zIndex: 1, },
    '& .content': { flex: 20, },
  }
}));