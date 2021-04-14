import { atom } from 'recoil'

export const modalControls = atom({
  key: 'modalControls',
  default: {
    attributes: {
      'Amenities': true,
      'MRT': false,
      'Schools': false,
      'Parks': false,
      'Race Ratio': false,
      'Gender Ratio': false,
      'Population Density': false,
    }, 
    layers: {
      'Heat Map (2D Only)': false,
      'Hexagon Layer (3D Only)': false,
      'Scatter Layer (2D Only)': false,
      'Region Border Layer (2D Only)': false,
    },
    panels: {
      'Data Points List (Left)': false,
      'Statistics Panel (Right)': false
    }
  }
})