import React from 'react'
import "./tabBar.css"
import { FiMap, FiBarChart2, FiChevronUp, FiMenu, FiBookmark, FiSettings } from "react-icons/fi";

export default function TabBar() {
    return (
        <div className="tabBar-container">
            <button className="tabBar-item">
                <FiMap/>
                Map
            </button>
            <button className="tabBar-item">
                <FiBarChart2/>
                Charts
            </button>

            <button className="tabBar-pull">
                <FiChevronUp/> 
                <br/>
                <FiMenu/>
            </button>

            <button className="tabBar-item">
                <FiBookmark/>
                Highlights
            </button>
            <button className="tabBar-item">
                <FiSettings/>
                Settings
            </button>
        </div>
    )
}
