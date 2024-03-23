// app/list-charger/page.tsx
"use client";

import { CurrencyDollarIcon, MagnifyingGlassIcon, MapIcon } from "@heroicons/react/24/outline";
import React, { useState } from 'react';
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";


const ListCharger: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "listCharger",
    args: ["Anthonys House", BigInt(50)],
    blockConfirmations: 1,
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });
  const [location, setLocation] = useState<string>();
  const [pricePerHour, setPricePerHour] = useState<string>();


  return (
  <>
    <div className="bg-gradient-to-r from-[#D0E9FF] to-[#A1C4FD]">

    <div className="flex justify-center items-center">
        <div className='w-1/2 p-5 card '>
            <div className='pb-5 justify-center items-center'>
            <div className='flex flex-col justify-center items-center pb-5'> {/* Adjusted for vertical centering */}
                <h1 className='text-4xl font-bold pb-4'>List your Charger</h1>
              </div>
              <InputBase name="location" placeholder="Location" value={location} onChange={setLocation} />
            </div>
            <div className='pb-5'>
              <InputBase name="pricePerHour" placeholder="Price Per Hour" value={pricePerHour} onChange={setPricePerHour} />
            </div>
              <button className="btn btn-primary mt-4 shadow-2xl " onClick={() => writeAsync()}>
              List My Charger Now
              </button>
          </div>
    </div>  

    <div className="flex justify-center items-center w-full mt-16 px-8 py-12">
  <div className="flex flex-col sm:flex-row justify-center items-center gap-12 rounded-3xl shadow-2xl bg-base-100 w-3/4 mx-auto">
    <div className="flex flex-col px-10 py-10 text-center items-center max-w-xs">
      <CurrencyDollarIcon className="h-10 w-10 fill-secondary" />
      <p>
        Transform your driveway into a profit center. List your EV charger and earn passive income while supporting EV Charging Infrastructure.
      </p>
    </div>
    <div className='divider divider-vertical mx-4'></div>
    <div className="flex flex-col px-10 py-10 text-center items-center max-w-xs">
      <MagnifyingGlassIcon className="h-10 w-10 fill-secondary" />
      <p>
        Explore our network of EV chargers. Contribute to a greener planet by sharing your charger while offsetting your EV costs.
      </p>
    </div>
  </div>
</div>

  </div>
  </>
  );
};

export default ListCharger;
