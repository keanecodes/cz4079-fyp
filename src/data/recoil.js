import { atom } from 'recoil'

export const DEFAULT_LAYER = 'scatter'

export const resaleData = atom({
  key: 'resaleData',
  default: null
})

export const borderData = atom({
  key: 'borderData',
  default: null
})

export const modalControls = atom({
  key: 'modalControls',
  default: {
    attributes: {
      checkbox: {
        'Amenities': true,
        'MRT': false,
        'Schools': false,
        'Parks': false,
        'Race Ratio': false,
        'Gender Ratio': false,
        'Population Density': false,
      }
    }, 
    layers: {
      radio: {
        'Scatter Layer (2D Only)': DEFAULT_LAYER,
        'Heat Map (2D Only)': 'heat',
        'Hexagon Layer (3D Only)': 'hex',
      },
      checkbox: {
        'Region Border Layer (2D Only)': false,
      }
    }
  }
})

export const layerSelection = atom({
  key: 'layerSelection',
  default: DEFAULT_LAYER
})

export const overlaySelection = atom({
  key: 'overlaySelection',
  default: []
})

export const UILoading = atom({
  key: 'UILoading',
  default: true
})

export const UITxtLoading = atom({
  key: 'UITxtLoading',
  default: "Loading 100,000 Data Points..."
})