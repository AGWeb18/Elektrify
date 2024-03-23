"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon, MagnifyingGlassIcon, MapIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import MapWithPins from '~~/components/MapWithPins'; // Adjust the import path if necessary


const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
  <div className="bg-gradient-to-r from-[#D0E9FF] to-[#A1C4FD]">
      <div className="flex items-center flex-col flex-grow">

          <div className="hero h-96" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
            <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
               <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Elektris</h1>
                <p className="mb-5">The platform transforming EV charging into passive income. Support green infrastructure and become part of a sustainable future.</p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        

        <div className="flex-grow w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-stretch gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <CurrencyDollarIcon className="h-10 w-10 fill-secondary" />
              <p className="flex-1">
                <Link href="/list-charger" passHref className="link">List your EV Charger</Link> to earn extra income.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-10 w-10 fill-secondary" />
              <p className="flex-1">
                <Link href="/explore" passHref className="link">Explore</Link> a network of EV Chargers
              </p>
            </div>
          </div>
        </div>


        <div className="divider"></div> 

          
          <div className="flex justify-center mx-auto py-12">
              <div className="card bg-base-100 shadow-xl flex justify-center">
                  <div className="card-body">
                    <h2 className="mb-5 text-4xl font-bold">Find a Charger</h2>
                    <input type="text" placeholder="Find a Charger" className="input input-bordered w-full max-w-xs mb-10" />
                  </div>
              </div>
          </div>
          <div className="w-3/4">
              <MapWithPins />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
