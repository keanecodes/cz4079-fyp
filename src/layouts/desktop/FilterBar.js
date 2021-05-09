import React from 'react'
// import Map3DToggle from './Filter3DToggle'
import LayersPopper from './LayersPopper'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { 
  mapOriginalData, 
  mapData,
  filterAttributes,
} from 'data/recoil'

export default function FilterBar() {
  const classes = useStyles()

  const data = useRecoilValue(mapOriginalData)
  const filters = useRecoilValue(filterAttributes)
  const setFilter = useSetRecoilState(mapData)
  
  React.useEffect(() => {
    setFilter(
      data
      .filter(d => filters['room'][0] === "" ? Boolean : d['room'] === filters['room'][0])
      .filter(d => filters['flat_model'][0] === "" ? Boolean : d['flat_model'] === filters['flat_model'][0])
      .filter(d => filters['resale_price'][0] === 0 ? Boolean : d['resale_price'] >= filters['resale_price'][0] && d['resale_price'] <= filters['resale_price'][1])
    )
  // eslint-disable-next-line 
  }, [filters])
    
  

  return (
    <div className={classes.filterBarRoot}>
      <div className={classes.logo}/>
      <div className={classes.filters}>
        <FilterOption name="Model" control="dropdown"/>
        <FilterOption name="Bedrooms" control="dropdown"/>
        <FilterOption name="Prices" control="dropdown"/>
        <LayersPopper/>
      </div>
    </div>
  )
}

const FilterOption = ({name, control}) => {
  const classes = useStyles()
  const [filters, setFilters] = useRecoilState(filterAttributes)
  const updateHandler = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.split(',')
    })
  }
  return (
    <div className={classes.filterOptionRoot}>
      {name}
      {control === 'dropdown' && 
        name === 'Model' 
        ? (<select name='flat_model' onChange={updateHandler}>
          <option value="">All</option>
          <option>Improved</option>
          <option>New Generation</option>
          <option>Standard</option>
          <option>Simplified</option>
          <option>Model A</option>
          <option>Premium Apartment</option>
          <option>Apartment</option>
          <option>Model A2</option>
          <option>Adjoined flat</option>
          <option>2-room</option>
          <option>Terrace</option>
          <option>DBSS</option>
          <option>Type S2</option>
          <option>Type S1</option>
          <option>Premium Apartment Loft</option>
          <option>Maisonette</option>
          <option>Model A-Maisonette</option>
          <option>Premium Maisonette</option>
          <option>Improved-Maisonette</option>
          <option>Multi Generation</option>
        </select>) 
        : name === 'Bedrooms' 
        ? (<select name='room' onChange={updateHandler}>
          <option value="">All</option>
          <option value="1 ROOM">1 Rooms</option>
          <option value="2 ROOM">2 Rooms</option>
          <option value="3 ROOM">3 Rooms</option>
          <option value="4 ROOM">4 Rooms</option>
          <option value="5 ROOM">5 Rooms</option>
          <option value="EXECUTIVE">Executive</option>
        </select>) 
        : name === 'Prices' 
        && (<select name='resale_price' onChange={updateHandler}>
          <option value={[0, Infinity]}>All</option>
          <option value={[150000, 250000]}>150K to 250K</option>
          <option value={[250000, 500000]}>250K to 500K</option>
          <option value={[500000, Infinity]}>More than 500K</option>
        </select>) 
      }
    </div>
  )
}

const useStyles = makeStyles(() => ({
  filterBarRoot: {
    display: 'grid',
    fontSize: '0.85rem',
    gridTemplateColumns: 'minmax(150px, 10%) 1fr auto',
  },
  logo: {
    width: '100px',
    height: '2rem',
    margin: '1rem',
    backgroundColor: 'white',
  },
  filters: {
    height: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr) minmax(2rem,5%)',
  },
  filterOptionRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 1rem',
    borderTop: '5px var(--dark-background) solid',
    color: 'var(--grey-unselect)',
    fontWeight: '600',
    fontSize: '0.85rem',
    letterSpacing: '0.025rem',
    transition: 'all 0.35s',
    '&:hover, &:active': {
      borderTop: '5px var(--blue-highlight) solid',
    },
    '& select': {
      marginTop: '0.5rem',
      border: 'none',
      borderRadius: '0.2rem',
      borderStyle: 'none',
      fontSize: '0.9rem',
      letterSpacing: '0.025rem',
      backgroundColor: 'transparent',
      color: 'var(--blue-highlight)',
      fontWeight: '600',
      outlineColor: 'transparent',
      transition: 'all ease-in-out 0.15s',
      '&:focus, &:active': {
        outline: 'none',
        border: 'none',
      }
    }
  },
}))
