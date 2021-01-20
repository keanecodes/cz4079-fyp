import React, { useState, useMemo } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGLMap from 'components/map/Map'
import FilterPills from 'components/controls/mobile/FilterPills'
import FilterBar from 'components/controls/desktop/FilterBar';
import Timeline, { getTimeRange } from 'components/controls/desktop/Timeline'
import TabBar from 'components/controls/mobile/TabBar';
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core/styles';

export default function App({data}) {
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 767, orientation: "portrait"})

  const [state, setState] = useState({
    show3D: false,
  });

  const [filter, setFilter] = useState(null);
  const timeRange = useMemo(() => getTimeRange(data), [data]);
  const filterValue = filter || timeRange;

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.App}>
      { !isMobile && <div className="section header"> <FilterBar show3D={state.show3D} handleChange={handleChange} /> </div>}
      <main className="content">
        <MapboxGLMap data={data} filterValue={filterValue} show3D={state.show3D}/>
        {isMobile && <FilterPills/>}
      </main>
      <footer className="footer" >
        { isMobile ? <TabBar/> : (timeRange && (<Timeline data={data} value={filterValue} min={timeRange[0]} max={timeRange[1]} onChange={setFilter}/>)) }
      </footer>
    </div>
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
    },
    '& .footer': { zIndex: 1, },
    '& .content': { flex: 20, },
  }
}));