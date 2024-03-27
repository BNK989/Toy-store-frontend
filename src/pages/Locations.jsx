import React from 'react'
import GoogleMapReact from 'google-map-react'
import { useState } from 'react'

//import { MapHoverElm } from '../cmps/mapHoverElm.jsx'

function Marker() {
  return <div style={{ height: '1em', width: '1em', borderRadius: '50%', background: 'red' }}></div>
}

function Flag({text}){
    return <div style={{fontSize: '2em'}}>{text}</div>
}

export function Locations() {
  const [center, setCenter] = useState({ lat: 32.794, lng: 34.9896 })
  const zoom = 10
  // TODO make branches come from store
  const branches = [
    {
      city: 'Haifa',
      id: 101,
      position: {
        lat: 32.794,
        lng: 34.9896,
      },
    },
    {
      city: 'Hadera',
      id: 102,
      position: {
        lat: 32.437408,
        lng: 34.925621,
      },
    },
    {
      city: 'Tel Aviv',
      id: 103,
      position: {
        lat: 32.0853,
        lng: 34.781769,
      },
    },
    {
        city: 'Yehud',
        id: 104,
        position: {
          lat: 32.03415,
          lng: 34.88646,
        },
      },
  ]
  const testCoords = {
    lat: 32.794,
    lng: 34.9896,
  }
  const handleClick = ({lat, lng}) => {
    setCenter({lat, lng})
  }

  return (
    <div>
      {branches.map((branch) => {
        return (
          <button key={branch.city} onClick={() => setCenter(branch.position)}>
            {branch.city}
          </button>
        )
      })}
      <div style={{ height: '80dvh', width: '100%' }}>
        <GoogleMapReact 
        bootstrapURLKeys={{ key: 'AIzaSyDQlVeA8YSa4Bnjc8mGClgXvA5UUSXBFHw' }}
        defaultCenter={{ lat: 32.794, lng: 34.9896 }} 
        center={center} 
        defaultZoom={zoom}
        onClick={handleClick}
        >
          {branches.map((branch) => {
            return <Marker lat={branch.position.lat} lng={branch.position.lng} key={branch.id} />
          })}
          <Flag text="🚩" {...testCoords} />
        </GoogleMapReact>
      </div>
    </div>
  )
}
