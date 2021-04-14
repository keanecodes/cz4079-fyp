import React, { useState, useEffect, useMemo } from 'react';
import MapboxGLMap from 'layouts/common/Map'
import FilterPills from 'layouts/mobile/FilterPills'
import FilterBar from 'layouts/desktop/FilterBar';
import Timeline, { getTimeRange } from 'layouts/desktop/Timeline'
import TabBar from 'layouts/mobile/TabBar';
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core/styles';
import { useSetRecoilState } from 'recoil';
import { resaleData } from 'data/recoil'

export default function App({data}) {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 767, orientation: "portrait"})
  const setData = useSetRecoilState(resaleData)
  setData(data)

  const [state, setState] = useState({
    show3D: false,
  });

  const [filter, setFilter] = useState(null)
  
  useEffect(() => {

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