import React, { Component, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Axios from "axios";

export default function GoogleMap(props) {

  useEffect(() => {
    Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${props?.surveyFormObject?.address}&key=AIzaSyA16d9FJFh__vK04jU1P64vnEpPc3jenec`)
      .then(data => console.log(data));

  }, [])
  //     https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,
  // +Mountain+View,+CA&key=YOUR_API_KEY
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
        defaultCenter={{
          lat: 59.95,
          lng: 30.33
        }}
        defaultZoom={11}
      >
        <div className="marker"
          style={{ backgroundColor: 'red', cursor: 'pointer' }}
          title={"current location"}
        />
      </GoogleMapReact>
    </div>
  )
}

