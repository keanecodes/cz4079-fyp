import React from 'react'
import MapboxGLMap from 'components/map/Map'
import FilterPills from 'components/controls/mobile/FilterPills'

export default function Content({render}) {
  return (
    <>
      <main className="content" >
        <MapboxGLMap/>
        {render === 'mobile' && <FilterPills/>}
      </main>
    </>
  )
}
