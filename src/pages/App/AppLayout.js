import React from 'react'
import { Switch } from "react-router-dom";
// import { getRoutes } from "routes.js";
import { Layout } from 'antd';


import { useMediaQuery } from 'react-responsive'
import NavBarDesktop from 'components/NavBarDesktop';
import NavBarMobile from 'components/NavBarMobile'

function AppLayout() {

  const isMobile = useMediaQuery({ maxWidth: 767, orientation: "portrait"})
    
  // componentDidUpdate(e) {
  //   if (e.history.action === "PUSH") {
  //     document.documentElement.scrollTop = 0;
  //     document.scrollingElement.scrollTop = 0;
  //     // this.mainPanel.current.scrollTop = 0;
  //   }
  // }

  return (
    <div className="AppLayout">
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        { isMobile ? <NavBarMobile/> : <NavBarDesktop/> }
        <Layout>
          <Layout.Content style={{background: "#fff"}}>
              <Switch>
              {/* {getRoutes("/app")} */}
              </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  )

}

export default AppLayout