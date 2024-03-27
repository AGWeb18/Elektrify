/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

// app/list-charger/page.tsx
import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { createClient } from "@supabase/supabase-js";
import type { NextPage } from "next";
import Autocomplete from "react-google-autocomplete";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon, MagnifyingGlassIcon, MapIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const ListCharger: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "listCharger",
    args: ["Anthonys House", BigInt(50)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const supabase_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabase_anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase_pw = process.env.NEXT_PUBLIC_SUPABASE_PW as string;
  const googleAPIKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  // Create a single instance of the Supabase client
  const supabase = createClient(supabase_URL, supabase_anon_key);

  const [fullAddress, setFullAddress] = useState("");
  const [location, setLocation] = useState<string>();
  const [pricePerHour, setPricePerHour] = useState<string>("30");

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPricePerHour(event.target.value);
  };
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
  async function signInAndInsert(fullAddress: string, pricePerHour: string) {
    try {
      // Sign in to Supabase
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: "dev@elektris.com",
        password: supabase_pw,
      });

      // Handle sign-in errors
      if (signInError) throw signInError;

      // Insert data into 'DIM_LOCATION_T'
      const { data: insertData, error: insertError } = await supabase
        .from("DIM_LOCATION_T")
        .insert([{ location_name: fullAddress, pricePerHour: pricePerHour, user_id: connectedAddress }]);

      // Handle insertion errors
      if (insertError) throw insertError;

      // Return or process the data
      return { signInData, insertData };
    } catch (error) {
      // Handle any errors that occur during the sign-in or insert process
      console.error("Error:", error);
      return { error };
    }
  }

  function runInsert() {
    signInAndInsert(fullAddress, pricePerHour)
      .then(result => {
        console.log("Success:", result);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

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
                  onPlaceSelected={place => {
                    const fullAddress =
                      place.address_components![0].long_name! +
                        " " +
                        place.address_components![1].long_name! +
                        " " +
                        place.address_components![2].long_name! +
                        " " +
                        place.address_components![3].long_name! +
                        " " +
                        place.address_components![4].long_name! || "No address found";

                    setFullAddress(fullAddress);

                    const latitude = place.geometry?.location?.lat();
                    const longitude = place.geometry?.location?.lng();

                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, ${fullAddress}`);
                  }}
                  defaultValue={location}
                  placeholder="Enter City"
                  className="input input-bordered w-full max-w-xs mb-10 text-center"
                />
              </div>
              <p className="text-center">${`${pricePerHour}/Hour`}</p>
              <input
                type="range"
                min={"0"}
                max="50"
                defaultValue="30"
                onChange={handlePriceChange}
                value={pricePerHour}
                className="range range-primary"
                step="10"
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
              </div>

              <button
                className="btn btn-primary mt-4 shadow-2xl"
                onClick={() => {
                  runInsert();
                  writeAsync();
                }}
              >
                List My Charger Now
              </button>
              <p className="text-center">This transaction will incur a Transaction Fee.</p>
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
      </div>
    </>
  );
};

export default ListCharger;
