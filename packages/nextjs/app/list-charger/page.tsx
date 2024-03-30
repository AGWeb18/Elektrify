/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

// app/list-charger/page.tsx
import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
// import { createClient } from "@supabase/supabase-js";
import { supabase } from '../../services/supabaseClient'; // Update the import path as necessary

import type { NextPage } from "next";
import Autocomplete from "react-google-autocomplete";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon, MagnifyingGlassIcon, MapIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import Image from 'next/image';


const ListCharger: NextPage = () => {
// ======================= VARIABLES ==========================

  const { address: connectedAddress } = useAccount();
  const googleAPIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  
  
  const [fullAddress, setFullAddress] = useState("");
  const [location, setLocation] = useState<string>();
  const [pricePerHour, setPricePerHour] = useState<string>("40");
  const [preciseLat, setPreciseLat] = useState("");
  const [preciseLng, setPreciseLng] = useState("");
  const [approxLat, setApproxLat] = useState("");
  const [approxLng, setApproxLng] = useState("");

  const center = {
    lat: 44.32933489719813,
    lng: -78.7230982496161,
  };

  
  // Create a bounding box with sides ~10km away from the center point
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const options = {
    bounds: defaultBounds,
    componentRestrictions: { country: "ca" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["address"], // This ensures that the autocomplete suggestions are addresses
  };


// ======================= FUNCTIONS ==========================

  function prepareCoordinates(lat: number, lng: number) {
    // Precise coordinates as they are
    const preciseLat = lat;
    const preciseLng = lng;
  
    // Approximate coordinates by reducing precision
    // Here we choose 3 decimal places (~111 meters) for approximation
    const approxLat = parseFloat(lat.toFixed(3));
    const approxLng = parseFloat(lng.toFixed(3));
  
    return { preciseLat, preciseLng, approxLat, approxLng };
  }
  
  const handlePlaceSelected = (
    place: google.maps.places.PlaceResult, 
    ref?: React.RefObject<HTMLInputElement>, 
    autocompleteRef?: React.RefObject<google.maps.places.Autocomplete>
  ) => {
    if (!place.geometry || !place.geometry.location) {
      console.error("Place has no location.");
      return;
    }
  
    // Successfully retrieved place object
  
    let fullAddress = "";
  
    // Check for formatted_address
    if (place.formatted_address) {
      fullAddress = place.formatted_address;
    } else {
      // Parse the full address manually if formatted_address is not available
      const addressComponents = place.address_components;
      if (addressComponents) {
            // Define the indexes of the elements you want to include
            const selectedIndexes = [0, 1, 2, 3, 4, 7, 8, 9];

            // Filter the address components to only include those at the specified indexes
            const selectedComponents = addressComponents.filter((component, index) => selectedIndexes.includes(index));

            // Map the filtered components to their short_name and join them into a string
            const addressParts = selectedComponents.map(component => component.short_name);
            const fullAddress = addressParts.join(" ");
            
                // Update the state with the full address
            setFullAddress(fullAddress);
            // Extract latitude and longitude using the functions provided by the geometry.location object
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
          
            const { preciseLat, preciseLng, approxLat, approxLng } = prepareCoordinates(latitude, longitude);
            setPreciseLat(String(preciseLat));
            setPreciseLng(String(preciseLng));
            setApproxLat(String(approxLat));
            setApproxLng(String(approxLng));


            console.log(`Full Address: ${fullAddress}, Precise Lat: ${preciseLat}, Precise Lng: ${preciseLng}, Approx Lat: ${approxLat}, Approx Lng: ${approxLng}`);
          
        } else {
        fullAddress = "No address found";
      }
    }
  

    // Handle the coordinates as needed
  };
  
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPricePerHour(event.target.value);
  };


  const { data, error } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "listCharger",
    args: [fullAddress, BigInt(pricePerHour || "0")], // Ensure these values are correctly formatted and available
  });
  

  async function signInAndInsert(fullAddress: string, pricePerHour: string) {
    try {
      
      // Insert data into 'DIM_LOCATION_T'
      const { data: insertData, error: insertError } = await supabase
        .from("DIM_LOCATION_T")
        .insert([{ location_name: fullAddress
                  , pricePerHour: pricePerHour
                  , user_id: connectedAddress
                  , precise_long: preciseLng
                  , precise_lat: preciseLat
                  , approx_lat: approxLat
                  , approx_long: approxLng
                   }]);

      // Handle insertion errors
      if (insertError) throw insertError;

      // Return or process the data
      return { insertData };
      
    } catch (error) {
      // Handle any errors that occur during the sign-in or insert process
      console.error("Error:", error);
      return { error };
    }
  }

  function runInsert() {
    signInAndInsert(fullAddress, pricePerHour, )
      .then(result => {
        console.log("Success:", result);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }



  // ======================= FRONTEND ==========================
  return (
    <>
      <div className="bg-primary">
        <div className="flex justify-center items-center mt-10 py-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 rounded-3xl shadow-2xl bg-base-100 w-1/2">
            <div className="p-5 card">
              <h1 className="text-4xl font-bold pb-4 text-center">List your Charger</h1>
              <div className="pb-4">
                <Autocomplete
                  apiKey={googleAPIKEY}
                  options={options}
                  onPlaceSelected={handlePlaceSelected}
                  defaultValue={location}
                  placeholder="List your EV Address"
                  className="input input-bordered w-full max-w-xs mb-10 text-center"
                />
              </div>
              <p className="text-center">${`${pricePerHour}/Hour`}</p>
              <input
                type="range"
                min={"0"}
                max="50"
                onChange={handlePriceChange}
                value={pricePerHour}
                className="range range-primary"
                step="5"
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>0</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
                <span>40</span>
                <span>45</span>
                <span>50</span>
              </div>

              <button
                className="btn btn-primary mt-4 shadow-2xl"
                onClick={() => {
                  // First, insert into the database
                  runInsert();
                  // Then, write to the blockchain
                  // setShoul`dWrite(true); // Set the flag to true to trigger the write operation
                }}
              >
                List My Charger Now
              </button>
              <p className="text-center">This transaction will incur a Transaction Fee.</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center m-5 ">
        <div className="flex bg-base-100 w-1/2 justify-center align-center p-10 rounded-3xl shadow-2xl" >              
        <Image src="/EVListingPage.png" 
                      width={600} height={600} 
                      alt="Elektris Listing" 
                      className="rounded-3xl" />
                
        </div>
        </div>
        </div>


        <div className="mx-auto pt-10 pb-20">
          <div className="flex flex-col sm:flex-row justify-center items-center rounded-3xl shadow-2xl bg-base-100 w-3/4 mx-auto py-10">
            <div className="flex flex-col py-10 text-center items-center w-3/4">
              <div
                className="tooltip border-black"
                data-tip="Users can earn an income just by sharing their EV Charger when not in use"
              >
                <CurrencyDollarIcon className="h-10 w-10 fill-secondary" />
              </div>
              <p>
                Transform your driveway into a profit center. List your EV charger and earn passive income while
                supporting EV Charging Infrastructure. Explore our network of EV chargers. Contribute to a greener
                planet by sharing your charger while offsetting your EV costs.
              </p>
            </div>
          </div>
        </div>



        
    </>
  );
};

export default ListCharger;
