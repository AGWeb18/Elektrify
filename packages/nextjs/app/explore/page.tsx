"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import MapWithPins from '~~/components/MapWithPins'; // Adjust the import path if necessary

const Explore: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 mb-10">
          <h1 className="text-center">
          <span className="block text-2xl mb-2">List Your EV Charger, Support Charging Infrastructure</span>
          <span className="block text-4xl font-bold">Elektris</span>
          </h1>
        </div>

        {/* <div className="flex justify-center w-3/4"> */}
            <MapWithPins />
        {/* </div> */}



      </div>
    </>
  );
};

export default Explore;
