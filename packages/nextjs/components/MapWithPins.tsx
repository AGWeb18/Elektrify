"use client";
import React from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '60vh',
  width: '100%',
  borderRadius: "10px",
  borderWidth:"1px",
  borderColor:"black",
};

const center = {
  lat: 44.32933489719813,
  lng: -78.7230982496161,
};

const MapWithPins = () => {
  // You can still use the useJsApiLoader hook if you need to wait for the API script to load
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // Asserting non-null
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={12}
      options={{
        mapId: '4504f8b37365c3d0',
      }}
    >
      {/* Example Marker */}
      <MarkerF position={center} />
    </GoogleMap>
  );
};

export default MapWithPins;
