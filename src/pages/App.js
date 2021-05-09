import React, { useState, useMemo } from 'react';
import MapboxGLMap from 'layouts/common/Map'
import FilterPills from 'layouts/mobile/FilterPills'
import FilterBar from 'layouts/desktop/FilterBar';
import Timeline, { getTimeRange } from 'layouts/desktop/Timeline'
import TabBar from 'layouts/mobile/TabBar';
import DrawerDataPoint from 'layouts/desktop/DrawerDataPoint';
import DrawerStatistics from 'layouts/desktop/DrawerStatistics';
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core/styles';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { mapOriginalData, UITxtLoading } from 'data/recoil';
import { modalControls } from 'data/recoil';


export default function App() {
  const setTxtLoading = useSetRecoilState(UITxtLoading)
  setTxtLoading("Loading Application...")
  const classes = useStyles()
  const isMobile = useMediaQuery({ maxWidth: 767, orientation: "portrait"})
  const data = useRecoilValue(mapOriginalData)
  const modal = useRecoilValue(modalControls)

  const [filter, setFilter] = useState(null)

  const timeRange = useMemo(() =>  getTimeRange(data), [data]);
  const filterValue = filter || timeRange;

  return (
    <>
      {data && (
        <div className={classes.App}>
          { !isMobile && <>
            <div className="section header"> <FilterBar /> </div>
            <DrawerDataPoint/>
            {modal.layers.checkbox['Region Border Layer (2D Only)'] && <DrawerStatistics/>}
            </>
          }
          <main className="content">
            <MapboxGLMap filterValue={filterValue}/>
            {isMobile && <FilterPills/>}
          </main>
          <footer className="footer" >
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
      zIndex: 2,
    },
    '& .footer': { zIndex: 2, },
    '& .content': { flex: 20, },
  }
}));