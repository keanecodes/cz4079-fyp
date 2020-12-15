import React, { useState } from 'react'
import { TabBar } from 'antd-mobile';
import { IconContext } from "react-icons";
import { FiHome, FiCreditCard, FiAward, FiCircle } from "react-icons/fi";
import "./NavBar.css"

function MobileNavBar() {
  let [selectedTab, setSelectedTab] = useState('redTab');
  //let [hidden, setHidden] = useState(false);
  //let [fullScreen, setFullScreen] = useState(true);

  return (
    <div style={true ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 600 }}>
      <TabBar
        unselectedTintColor="#657786"
        tintColor="#1DA1F2"
        barTintColor="white"
        hidden={false}
      >
        <TabBar.Item
          title="Home"
          key="home"
          icon={<IconContext.Provider value={{ className: "mobile-navbar-icon" }}>
                  <FiHome/>
                </IconContext.Provider>}
          selectedIcon={
            <IconContext.Provider value={{ color: "var(--blue-icon-select)", className: "mobile-navbar-icon" }}>
              <FiHome/>
            </IconContext.Provider>}
          selected={selectedTab === 'homeTab'}
          onPress={() => setSelectedTab('homeTab')}
          data-seed="logId"
        >
          
        </TabBar.Item>
        <TabBar.Item
          title="Accounts"
          key="accounts"
          icon={<IconContext.Provider value={{ className: "mobile-navbar-icon" }}>
            <FiCreditCard/>
          </IconContext.Provider>}
          selectedIcon={
          <IconContext.Provider value={{ color: "var(--blue-icon-select)", className: "mobile-navbar-icon" }}>
            <FiCreditCard/>
          </IconContext.Provider>}
          selected={selectedTab === 'accountTab'}
          onPress={() => setSelectedTab('accountTab')}
          data-seed="logId1"
        >

        </TabBar.Item>
        <TabBar.Item
          title="Challenges"
          key="challenges"
          icon={
            <IconContext.Provider value={{ className: "mobile-navbar-icon" }}>
              <FiAward/>
            </IconContext.Provider>}
          selectedIcon={
            <IconContext.Provider value={{ color: "var(--blue-icon-select)", className: "mobile-navbar-icon" }}>
              <FiAward/>
            </IconContext.Provider>}
          selected={selectedTab === 'challengeTab'}
          onPress={() => setSelectedTab('challengeTab')}
        >

        </TabBar.Item>
        <TabBar.Item
          title="You"
          key="you"
          icon={ <IconContext.Provider value={{ className: "mobile-navbar-icon" }}>
              <FiCircle/>
            </IconContext.Provider> }
          selectedIcon={ <IconContext.Provider value={{ color: "var(--blue-icon-select)", className: "mobile-navbar-icon" }}>
              <FiCircle/>
            </IconContext.Provider> }
          selected={selectedTab === 'youTab'}
          onPress={() => setSelectedTab('youTab')}
        >

        </TabBar.Item>
      </TabBar>
    </div>
  )
}

export default MobileNavBar;

