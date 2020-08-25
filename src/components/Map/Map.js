import React from 'react';
import GoogleMapReact from 'google-map-react';

import pin from './pin.png';

import styles from './Map.module.scss';

const Map = ({ marker }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyBZBTZH9vehg98i0n6WmA3yeWL7nLk_Pfk' }}
      defaultCenter={{
        lat: 62,
        lng: 17.5,
      }}
      defaultZoom={5}
      options={{
        disableDefaultUI: true,
        draggable: false,
      }}
      center={marker && { lat: marker.lat, lng: marker.lng }}
    >
      {marker && <Marker lat={marker.lat} lng={marker.lng} />}
    </GoogleMapReact>
  );
};

const Marker = () => (
  <div className={styles.marker}>
    <img src={pin} className={styles.pin} alt="Pin" />
  </div>
);

export default Map;
