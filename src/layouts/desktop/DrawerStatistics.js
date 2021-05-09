import React from 'react'
import TabDrawer from 'components/TabDrawer'
import { UIdrawerStatOpen } from 'data/recoil'

export default function DrawerStatistics() {

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
