/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const mapContainerStyle = {
  height: "60vh",
  width: "100%",
  borderRadius: "10px",
  borderWidth: "1px",
  borderColor: "black",
};

const center = {
  lat: 44.32933489719813,
  lng: -78.7230982496161,
};

interface Charger {
  id: string;
  created_at: string; // Assuming created_at is a string; adjust if it's a Date object
  location_name: string;
  pricePerHour: string; // Assuming pricePerHour is a string that represents a number; adjust the type as necessary
  user_id: string;
  precise_long: number;
  precise_lat: number;
  approx_long: number;
  approx_lat: number;
  is_available: boolean;
}

const MapWithPins = () => {
  const [chargers, setChargers] = useState<Charger[]>([]); // An array of Charger objects
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("DIM_LOCATION_T") // Adjust table name if necessary
        .select("*")
        .eq("is_available", true);
      console.log(`database data ${data}`);

      if (error) {
        console.error(error);
      } else {
        const chargersWithNumbers = data.map(charger => ({
          ...charger,
          precise_lat: parseFloat(charger.precise_lat),
          precise_long: parseFloat(charger.precise_long),
          // Convert any other fields that need to be numbers
        }));
        console.log(chargersWithNumbers);
        setChargers(chargersWithNumbers); // Update state with converted data
      }
    }

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12} options={{ mapId: "4504f8b37365c3d0" }}>
      {chargers.map(charger => (
        <MarkerF
          key={charger.id}
          position={{ lat: charger.precise_lat, lng: charger.precise_long }}
          title={charger.location_name}
        />
      ))}
    </GoogleMap>
  );
};

export default MapWithPins;
