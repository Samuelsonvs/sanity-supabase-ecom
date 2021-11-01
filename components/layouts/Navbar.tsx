/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

import { useUser } from "@/contexts/AuthContext";

const navItems = [{ home: "/" }, { category: "/category" }, { signin: "/signin" }, { signup: "/signup" }];

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 20 20"
                  fill="#fff"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 sm:w-6 sm:h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-none indicator">
          <div className={`${basket ? "inline-flex" : "hidden"} indicator-custom badge badge-sm badge-custom-color`}>{basket?.length}</div> 
          <Link passHref href="/basket">
          <a className="btn btn-square btn-ghost">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-5 h-5 sm:w-6 sm:h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6.4 3.2H32L27.2 17.6H6.4C5.97565 17.6 5.56869 17.7686 5.26863 18.0686C4.96857 18.3687 4.8 18.7757 4.8 19.2C4.8 19.6243 4.96857 20.0313 5.26863 20.3314C5.56869 20.6314 5.97565 20.8 6.4 20.8H27.2V24H6.4C5.12696 24 3.90606 23.4943 3.00589 22.5941C2.10571 21.6939 1.6 20.473 1.6 19.2C1.6 17.927 2.10571 16.7061 3.00589 15.8059C3.90606 14.9057 5.12696 14.4 6.4 14.4H6.928L4.8 8L3.2 3.2H0V0H4.8C5.22435 0 5.63131 0.168571 5.93137 0.468629C6.23143 0.768687 6.4 1.17565 6.4 1.6V3.2ZM8 32C7.15131 32 6.33737 31.6629 5.73726 31.0627C5.13714 30.4626 4.8 29.6487 4.8 28.8C4.8 27.9513 5.13714 27.1374 5.73726 26.5373C6.33737 25.9371 7.15131 25.6 8 25.6C8.84869 25.6 9.66263 25.9371 10.2627 26.5373C10.8629 27.1374 11.2 27.9513 11.2 28.8C11.2 29.6487 10.8629 30.4626 10.2627 31.0627C9.66263 31.6629 8.84869 32 8 32ZM24 32C23.1513 32 22.3374 31.6629 21.7373 31.0627C21.1371 30.4626 20.8 29.6487 20.8 28.8C20.8 27.9513 21.1371 27.1374 21.7373 26.5373C22.3374 25.9371 23.1513 25.6 24 25.6C24.8487 25.6 25.6626 25.9371 26.2627 26.5373C26.8629 27.1374 27.2 27.9513 27.2 28.8C27.2 29.6487 26.8629 30.4626 26.2627 31.0627C25.6626 31.6629 24.8487 32 24 32Z"
              />
            </svg>
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
                            <a
                              href="#"
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Your profile</span>
                            </a>
                            <Link passHref href="/profile/settings">
                              <a className="flex p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-3"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Settings</span>
                              </a>
                            </Link>
                            <Link passHref href="/">
                              <a
                                onClick={() => logOut()}
                                className="flex p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-3"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Sign out</span>
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
