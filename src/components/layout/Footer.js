import React from 'react'
import Timeline from 'components/controls/desktop/Timeline'
import TabBar from 'components/controls/mobile/TabBar';


export default function Footer({render}) {
  return (
    <footer className="footer" >
      {render === 'desktop' ? <Timeline/> : <TabBar/>}
    </footer>
  )
}


