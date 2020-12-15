import React from 'react'
// import { NavLink, Link } from "react-router-dom"

import { Layout, Menu } from 'antd'
import { IconContext } from "react-icons";
import { FiHome, FiCreditCard, FiAward, FiCircle } from "react-icons/fi";
import "./NavBar.css"
// import { ReactComponent as Logo } from "logo.svg";

// import { routes } from "routes.js"

function Sidebar() {
//   createLinks = routes => {
//     // eslint-disable-next-line
//     return routes.map((prop, key) => {
//       if (prop.layout === "/app") {
//         return (
//           <Menu.Item className={this.activeRoute(prop.layout + prop.path)} key={key}>
//             <NavLink to={prop.layout + prop.path} activeClassName="">
//               {prop.icon !== undefined ? (
//                 <>
//                   <Icon type={prop.icon} />
//                   <span>{prop.name}</span>
//                 </>
//               ) : ( <> <span>{prop.name}</span> </> )}
//             </NavLink>
//           </Menu.Item>
//         );
//       }
//     });
//   };
  // verifies if routeName is the one active (in browser input)
  // const activeRoute = routeName => {
  //   return window.location.href.indexOf(routeName) > -1 ? "ant-menu-item-selected" : "";
  // };
  return (
      <>
        <Layout.Sider
          collapsible
          collapsed="true"
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" style={{height: "50px", textAlign:"center", margin: "16px"}}>
            <FiCircle/>
          </div>
          {/* <div className="logo" >
            <Link to="/user/hub">
              <Logo className="sidebar__logo--svg"/>
              <span className="sidebar__logo--title">bookator</span>
            </Link>
          </div> */}
          <Menu theme="light" mode="inline">
            {/* {this.createLinks(routes)} */}
            <Menu.Item key="1" icon={
              <IconContext.Provider value={{ className: "mobile-navbar-icon" }}>
                <FiHome/>
              </IconContext.Provider>}/>
            <Menu.Item key="2" icon={<FiCreditCard />}/> 
            <Menu.Item key="3" icon={<FiAward />}/>
          </Menu>
        </Layout.Sider>
      </>
  );
}

export default Sidebar