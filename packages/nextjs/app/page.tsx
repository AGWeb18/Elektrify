"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import MapWithPins from "~~/components/MapWithPins";

// Adjust the import path if necessary
const Home: NextPage = () => {
  useAccount();

  return (
    <>
      <div className="bg-primary">
        <div className="flex items-center flex-col flex-grow pt-5">
          <h1 className="mb-5 text-5xl font-bold">Elektris</h1>
          <Image src="/EVHero.png" width={400} height={500} alt="Elektris Hero" className="rounded-3xl" />
          <div className="hero-content text-center">
            <div className="max-w-md">
              <p className="mb-5 text-xl">
                Transform your EV charger into a passive income stream, accelerate the transition to green
                transportation, and enjoy lower vehicle operating costs—all with minimal effort.{" "}
              </p>

              <Link href="/list-charger" passHref className="link">
                <button className="btn btn-secondary">Get Started</button>
              </Link>
            </div>
          </div>

          <div className="flex-grow w-full mt-16 px-8 py-12">
            <div className="flex justify-center items-stretch gap-12 flex-col sm:flex-row">
              <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                <CurrencyDollarIcon className="h-10 w-10 fill-secondary" />
                <p className="flex-1">
                  <Link href="/list-charger" passHref className="link">
                    List your EV Charger
                  </Link>{" "}
                  to earn extra income.
                </p>
              </div>
              <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                <MagnifyingGlassIcon className="h-10 w-10 fill-secondary" />
                <p className="flex-1">
                  <Link href="/explore" passHref className="link">
                    Explore
                  </Link>{" "}
                  a network of EV Chargers
                </p>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex justify-center mx-auto py-12 w-full">
            <div className="card bg-base-100 shadow-xl flex justify-center">
              <div className="card-body">
                <h2 className="text-4xl font-bold flex">Find a Charger</h2>
                <input
                  type="text"
                  placeholder="Find a Charger"
                  className="input input-bordered w-full max-w-xs mb-10 text-center"
                />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl flex justify-center w-3/4 mb-10">
            <div className="card-body">
              <MapWithPins />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
