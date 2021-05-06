import React, { useState } from 'react'
import FilterOption from './FilterOption'
import FilterModal from './FilterModal'
import Map3DToggle from './Filter3DToggle'
// eslint-disable-next-line
// import ProfileMenu from './ProfileMenu'
import { makeStyles } from '@material-ui/core/styles'

export default function FilterBar() {
  const classes = useStyles()
  const [show3D, set3D] = useState(false);
  
  const handleChange = e => set3D(e.target.checked)

  return (
    <div className={classes.root}>
        <div className={classes.logo}/>
        <div className={classes.filters}>
            <FilterOption name="Property" control="dropdown"/>
            <FilterOption name="Bedrooms" control="dropdown"/>
            <FilterOption name="Prices" control="dropdown"/>
            <FilterModal/>
            <Map3DToggle show3D={show3D} handleChange={handleChange}/>
        </div>
        {/* <ProfileMenu/> */}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
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
    gridTemplateColumns: 'repeat(3, 1fr) minmax(2rem,5%) minmax(3rem, 12%)',
  }
}))
