import React from 'react'
import "./filterOption.css"

export default function FilterOption({name, control}) {
  return (
    <div className="filter-option">
      {name}
      {control === 'dropdown' && 
        name === 'Property' 
        ? (<select>
          <option>HDB</option>
          <option>Condo</option>
          <option>Landed</option>
          <option>Terrace</option>
        </select>) 
        : name === 'Bedrooms' 
        ? (<select>
          <option>3-room</option>
          <option>4-room</option>
          <option>5-room</option>
        </select>) 
        : name === 'Prices' 
        && (<select>
          <option>150k-250k</option>
          <option>250k - 500k</option>
          <option>more than 500k</option>
        </select>) 
      }
    </div>
  )
}
