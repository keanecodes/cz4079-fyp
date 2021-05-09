import React from 'react'
import App from "./App"
import BackDrop from 'components/BackDrop'

// Data 
import * as d3 from 'd3-fetch'
import resales from 'data/resale1990_2020onwards.csv'
import borders from 'data/borders.geojson'
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { resaleData, borderData, UILoading, UITxtLoading } from 'data/recoil'

export default function InitApp() {
  const loading = useRecoilValue(UILoading)
  const setTxtLoading = useSetRecoilState(UITxtLoading)
  const setResale = useSetRecoilState(resaleData)
  const setBorder = useSetRecoilState(borderData)

  d3.csv(resales).then(res => {
    if (res) {
      const data = res.map(row => ({
        address: String(`${row.block} ${row.street_name}`),
        room: String(row.flat_type),
        model: String(row.flat_model),
        lRemain: String(row.remaining_lease),

        timestamp: new Date(`${row.month}`).getTime(),
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
        resale_price: Number(row.resale_price),
        floor_area_sqm: Number(row.floor_area_sqm)
      }));
      setTxtLoading("Loading 100,000 Data Points...")
      
      setResale(data)

      d3.json(borders).then(data => {
        setBorder(data)
        setTxtLoading("90%")
      });
    }
  })

  return (
    <>
      {loading && <BackDrop open={true}/>}
      <App/>
    </>
  )
}
