import React from 'react'
import FilterOption from './FilterOption'
import './filterBar.css';

export default function FilterBar() {
    return (
        <div className="filter-bar">
            <div className="app-logo"/>
            <div className="filter-option-container">
                <FilterOption name="Property" control="dropdown"/>
                <FilterOption name="Bedrooms" control="dropdown"/>
                <FilterOption name="Prices" control="dropdown"/>
                <FilterOption name="Nearby MRT" control="popup"/>
                <FilterOption name="More filters" control="popup"/>
            </div>
            <div className="user-logo"/>
        </div>
    )
}
