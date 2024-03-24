"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import MapWithPins from "~~/components/MapWithPins";

// Adjust the import path if necessary

const Explore: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="bg-primary flex items-center flex-col flex-grow pt-10">
        <div className="px-5 mb-10">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">Elektris</span>
            <span className="block text-2xl mb-2">Find a Charger In Your Area</span>
          </h1>
        </div>

        <input
          type="text"
          placeholder="Find a Charger"
          className="input input-bordered w-full max-w-xs mb-10 text-center"
        />

        <div className="flex justify-center w-full px-5 pb-10">
          <MapWithPins />
        </div>
      </div>
    </>
  );
};

export default Explore;
