"use client";

// app/list-charger/page.tsx
import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
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
  const [location, setLocation] = useState<string>();
  const [pricePerHour, setPricePerHour] = useState<string>();

  return (
    <>
      <div className="bg-primary">
        <div className="flex justify-center items-center mt-10 py-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 rounded-3xl shadow-2xl bg-base-100 w-1/2">
            <div className="p-5 card">
              <h1 className="text-4xl font-bold pb-4 text-center">List your Charger</h1>
              <div className="pb-4">
                <InputBase name="location" placeholder="Location" value={location} onChange={e => setLocation(e)} />
              </div>
              <InputBase
                name="pricePerHour"
                placeholder="~$/Hr 40"
                value={pricePerHour}
                onChange={e => setPricePerHour(e)}
              />
              <button
                className="btn btn-primary mt-4 shadow-2xl"
                onClick={() => {
                  // createChargerListing();
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
