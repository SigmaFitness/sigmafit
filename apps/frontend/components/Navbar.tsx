import {
  ArrowRightIcon,
  ChevronRightIcon,
  MenuAlt1Icon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { useGetCurrentUserQuery } from "../api";
import { Logo } from "./Logo";
import { Menu, Transition } from "@headlessui/react";

export const Navbar = () => {
  const { isError, isLoading } = useGetCurrentUserQuery();
  const topLinkUrl = !isLoading && !isError ? "/dash" : "/";
  const { route } = useRouter();

  return (
    <Menu>
      {({ open }) => (
        <div
          className={
            "navbar min-h-16 h-16 border-b z-50 transition-colors ease-in-out duration-300  " +
            (open ? "bg-primary border-gray-700 top-0 left-0 w-full" : "")
          }
        >
          <div className="flex-1 h-full">
            <Link href={topLinkUrl}>
              <div className="btn btn-ghost normal-case text-base">
                <Logo
                  className={"w-36 " + (open ? "text-white" : "text-black")}
                />
              </div>
            </Link>
          </div>

          <Menu.Button
            className={
              "btn btn-circle btn-ghost " +
              (isLoading || isError ? "xs:hidden" : "")
            }
          >
            {open ? (
              <CustomXIcon className="w-14 text-white" />
            ) : (
              <CustomMenuIcon className="w-10 text-black" />
            )}
          </Menu.Button>

          {isError && (
            <div className="xs:flex gap-4 hidden -translate-x-5">
              <Link href="/auth/welcome">
                <button className=" text-white btn rounded-md shadow-xl  font-bold bg-gradient-to-r from-secondary to-pink-700 px-3 btn-secondary">
                  Sign In
                </button>
              </Link>
            </div>
          )}

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Menu.Items
              as="div"
              className="z-50 flex px-6 text-center pt-5 flex-col text-white fixed left-0 bottom-0 w-screen bg-primary"
              style={{ height: "calc(100vh - 64px)" }}
              static
            >
              {!isLoading && !isError ? (
                <>
                  <Menu.Item>
                    <Link href="/dash">
                      <div
                        className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${
                          route === "/dash"
                            ? "text-yellow-400 hover:text-yellow-400 cursor-default"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between w-full h-9 ">
                          Dashboard
                          <ChevronRightIcon className="text-red-500 w-7" />
                        </div>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/sessionSchema/top">
                      <div
                        className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${
                          route === "/sessionSchema/top"
                            ? "text-yellow-400 hover:text-yellow-400 cursor-default"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between h-9">
                          Top Workout Routines
                          <ChevronRightIcon className="text-red-500 w-7" />
                        </div>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/workout">
                      <div
                        className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${
                          route === "/workout"
                            ? "text-yellow-400 hover:text-yellow-400 cursor-default"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between h-9">
                          Manage Workouts
                          <ChevronRightIcon className="text-red-500 w-7" />
                        </div>
                      </div>
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item>
                                    <Link href='/profile'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/profile' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">
                                                Profile
                                                <ChevronRightIcon className='text-red-500 w-7' />
                                            </div>
                                        </div>

                                    </Link>
                                </Menu.Item> */}
                  <Menu.Item>
                    <Link href="/insights">
                      <div
                        className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${
                          route === "/insights"
                            ? "text-yellow-400 hover:text-yellow-400 cursor-default"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between h-9">
                          <div className="space-x-2">
                            <span>Training Insights</span>
                            <span className="badge badge-sm badge-warning">
                              New
                            </span>
                          </div>
                          <ChevronRightIcon className="text-red-500 w-7" />
                        </div>
                      </div>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link href="/auth/logout">
                      <div
                        className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${
                          route === "/auth/logout"
                            ? "text-yellow-400 hover:text-yellow-400 cursor-default"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between h-9">Logout</div>
                      </div>
                    </Link>
                  </Menu.Item>
                </>
              ) : (
                <>
                  {/* <Menu.Item>
                                    <Link href='/about-us'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/about-us' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">

                                                About Us
                                                <ChevronRightIcon className='text-red-500 w-7' />

                                            </div>


                                        </div>
                                    </Link>
                                </Menu.Item> */}

                  {/* <Menu.Item>
                                    <Link href='/about-us'>
                                    <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/about-us' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                        <div className="flex justify-between h-9">

                                            <div className="space-x-2">
                                                <span>Features</span>
                                                <span className='badge badge-sm badge-warning'>Coming Soon</span>
                                            </div>

                                            <ChevronRightIcon className='text-red-500 w-7' />

                                        </div>


                                    </div>
                                    </Link>
                                </Menu.Item> */}

                  {/* <Menu.Item>
                                    <Link href='/pricing'>
                                        <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/pricing' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                                            <div className="flex justify-between h-9">
                                                <div className='space-x-2'>
                                                    <span>Pricing</span>
                                                    <span className='badge badge-sm badge-warning'>Coming Soon</span>
                                                </div>

                                                <ChevronRightIcon className='text-red-500 w-7' />
                                            </div>
                                        </div>
                                    </Link>
                                </Menu.Item> */}
                  <Menu.Item>
                    <Link href="/auth/welcome">
                      <div
                        className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${
                          route === "/auth/welcome"
                            ? "text-yellow-400 hover:text-yellow-400 cursor-default"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between h-9">
                          Sign In
                          <ChevronRightIcon className="text-red-500 w-7" />
                        </div>
                      </div>
                    </Link>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
};


const CustomMenuIcon = ({className}: {className: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path d="M3.5,6a1,1,0,1,0,1,1A1,1,0,0,0,3.5,6Zm4,2h14a1,1,0,0,0,0-2H7.5a1,1,0,0,0,0,2Zm0,3a1,1,0,1,0,1,1A1,1,0,0,0,7.5,11Zm4,5a1,1,0,1,0,1,1A1,1,0,0,0,11.5,16Zm10-5h-10a1,1,0,0,0,0,2h10a1,1,0,0,0,0-2Zm0,5h-6a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"/></svg>
)



const CustomXIcon = ({className}: {className: string}) => (
<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 32 32"><path fill="#fff" d="M10.05 23.95a1 1 0 0 0 1.414 0L17 18.414l5.536 5.536a1 1 0 0 0 1.414-1.414L18.414 17l5.536-5.536a1 1 0 0 0-1.414-1.414L17 15.586l-5.536-5.536a1 1 0 0 0-1.414 1.414L15.586 17l-5.536 5.536a1 1 0 0 0 0 1.414z"/></svg>
  )
