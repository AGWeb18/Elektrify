"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BlueCreateWalletButton from "./BlueCreateWalletButton";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AcademicCapIcon,
  Bars3Icon,
  BugAntIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "List Your Charger",
    href: "/list-charger",
    icon: <CurrencyDollarIcon className="h-4 w-4" />,
  },
  {
    label: "Explore Chargers",
    href: "/explore",
    icon: <MagnifyingGlassIcon className="h-4 w-4" />,
  },
  {
    label: "View Charging Appointment",
    href: "/view-appointments",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
  {
    label: "About",
    href: "/about",
    icon: <AcademicCapIcon className="h-4 w-4" />,
  },
];

const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="Elektris logo" className="cursor-pointer" fill src="/logo.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Elektris</span>
            <span className="text-xs">Powering the Drive of Tomorrow</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <li className="dropdown">
            <label tabIndex={0} className="btn btn-ghost hover:bg-secondary focus:!bg-secondary">
              Chargers <ChevronDownIcon className="h-5 w-5 ml-2" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/list-charger" passHref className="link">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" /> List Your Charger
                </Link>
              </li>
              <li>
                <Link href="/view-appointments" passHref className="link">
                  <BugAntIcon className="h-4 w-4 mr-2" /> View Charging Appointments
                </Link>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <label tabIndex={0} className="btn btn-ghost hover:bg-secondary focus:!bg-secondary">
              Explore <ChevronDownIcon className="h-5 w-5 ml-2" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/explore" passHref className="link">
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2" /> Explore Chargers
                </Link>
              </li>
              <li>
                <Link href="/about" passHref className="link">
                  <AcademicCapIcon className="h-4 w-4 mr-2" /> About
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex-grow gap-2 mr-4">
        {/* <BlueCreateWalletButton />  TURN BACK ON WHEN READY  */}
        <button className="btn btn-primary btn-sm">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </button>
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
