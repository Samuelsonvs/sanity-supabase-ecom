/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

import { useUser } from "@/contexts/AuthContext";
import BasketSVG from "@/public/static/svg/basket.svg";
import BasketButtonSVG from "@/public/static/svg/basketButton.svg";
import SearchSVG from "@/public/static/svg/search.svg";
import BurgerSVG from "@/public/static/svg/burger.svg";
import XSVG from "@/public/static/svg/x.svg";
import ProfileSVG from "@/public/static/svg/profile.svg";
import Logout from "@/public/static/svg/logout.svg";
import SettingsSVG from "@/public/static/svg/settings.svg";

const navItems = [
  { home: "/" },
  { category: "/category" },
  { signin: "/signin" },
  { signup: "/signup" },
];

export const Navbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { session, signOut, avatarUrl, basket } = useUser();
  const logOut = async () => {
    await signOut();
    console.log("log out");
  };

  return (
    <>
      <div className="navbar relative sm:absolute top-0 left-0 right-0 z-30 shadow-lg bg-primary bg-opacity-70 text-neutral-content">
        <div className="flex flex-none">
          <label htmlFor="my-modal-2" className="btn btn-square btn-ghost">
            <BurgerSVG className="h-8 w-8" />
          </label>
          <input
            ref={inputRef}
            type="checkbox"
            defaultChecked={false}
            id="my-modal-2"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box bg-black h-full w-full max-w-full rounded-none absolute flex flex-col justify-center items-center">
              <button
                className="absolute top-14 right-0 sm:right-2"
                onClick={() => inputRef.current?.click()}
              >
                <XSVG className="h-12 w-12" />
              </button>
              <div className="modal-action flex-col justify-center items-center">
                <ul>
                  {navItems.map((item, idx) => {
                    const [navHref, ...__] = Object.values(item);
                    const [navName, ..._] = Object.keys(item);
                    if (navName !== "signin" && navName !== "signup") {
                      return (
                        <li key={idx}>
                          <Link href={navHref}>
                            <a className="block p-4 text-4xl">{navName}</a>
                          </Link>
                        </li>
                      );
                    } else {
                      if (!session) {
                        return (
                          <li key={idx}>
                            <Link href={navHref}>
                              <a className="block p-4 text-4xl">{navName}</a>
                            </Link>
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center sm:justify-end px-2 mx-2">
          <Link passHref href="/">
            <a className="flex">
              <Image
                src="/static/images/navbar/navicon.png"
                width="110"
                height="31"
                alt="nav-icon"
              ></Image>
            </a>
          </Link>
        </div>
        <div className="flex-1 hidden sm:flex justify-end">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost"
            />
          </div>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <SearchSVG className="h-8 w-8" />
          </button>
        </div>
        <div className="flex-none indicator">
          <div
            className={`${
              basket ? "inline-flex" : "hidden"
            } indicator-custom badge badge-sm badge-custom-color`}
          >
            {basket?.length}
          </div>
          <Link passHref href={`${session ? "/basket" : "/signin"}`}>
            <a className="btn btn-square btn-ghost">
              <BasketSVG className="h-8 w-8" />
            </a>
          </Link>
        </div>
        <div className="flex-none">
          {session ? (
            <div className="w-full max-w-sm px-4">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="p-0 m-0 bg-transparent border-0">
                      <div className="avatar">
                        <div className="rounded-full border border-yellow-200 w-10 h-10 m-1 relative">
                          {avatarUrl ? (
                            <Image
                              layout="fill"
                              alt="profilpic"
                              src={avatarUrl}
                            />
                          ) : (
                            <Image
                              layout="fill"
                              alt="profilpic"
                              src="/static/images/navbar/mockprofile.png"
                            />
                          )}
                        </div>
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-50 w-32 mt-3 transform -translate-x-2/4">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-8 text-sm font-medium text-gray-600 bg-white p-5  text-center">
                            <Link passHref href="/profile/settings">
                              <a className="flex items-center space-x-3 p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                <ProfileSVG className="h-5 w-5" />
                                <span className="pl-1">Profile</span>
                              </a>
                            </Link>
                            <Link passHref href="/orders">
                              <a className="flex items-center space-x-3 p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                <BasketButtonSVG className="h-5 w-5" />
                                <span className="pl-1">Orders</span>
                              </a>
                            </Link>
                            <Link passHref href="/profile/settings">
                              <a className="flex items-center space-x-3 p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                <SettingsSVG className="h-5 w-5" />
                                <span className="pl-1">Settings</span>
                              </a>
                            </Link>
                            <Link passHref href="/">
                              <a
                                onClick={() => logOut()}
                                className="flex items-center space-x-3 p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                <Logout className="h-5 w-5" />
                                <span className="pl-1">Sign out</span>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>
          ) : (
            <Link passHref href="/signin">
              <a className="btn btn-ghost">Signin</a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
