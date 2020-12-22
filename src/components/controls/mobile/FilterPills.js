import React from 'react'
import "./filterPills.css"

export default function FilterPills() {
    return (
        <div className="filter-pills-container">
            <button className="filter-pill">Property</button>
            <button className="filter-pill">Bedrooms</button>
            <button className="filter-pill">Price</button>
            <button className="filter-pill">MRT</button>
            <button className="filter-pill">Year</button>
        </div>
    )
}
