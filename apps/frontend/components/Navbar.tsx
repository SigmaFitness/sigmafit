import { ChevronRightIcon, UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useGetCurrentUserQuery } from "../api";
import { Logo } from "./Logo";
import { Menu, Transition } from "@headlessui/react";
import { CustomMenuIcon } from "./CustomMenuIcon";
import { CustomXIcon } from "./icons/CustomXIcon";
import { WorkoutIcon } from "./icons/WorkoutIcon";
import { TopWorkoutRoutinesIcon } from "./icons/TopWorkoutRoutinesIcon";
import { DashboardIcon } from "./icons/DashboardIcon";
import { AnalyticsIcon } from "./icons/AnalyticsIcon";

export const Navbar = () => {
  const { isError, isLoading, data } = useGetCurrentUserQuery();
  const topLinkUrl = !isLoading && data?.is_logged_in ? "/dash" : "/";
  const { route } = useRouter();

  return (
    <Menu>
      {({ open }) => {
        if (typeof window !== "undefined") {
          // TODO: think of something more performant.
          if (open) {
            document.body.classList.add("overflow-hidden");
            document.body.classList.add("pt-16");
          } else {
            document.body.classList.remove("overflow-hidden");
            document.body.classList.remove("pt-16");
          }
        }
        return (
          <div
            className={
              "navbar min-h-16 h-16 border-b z-50 transition-colors ease-in-out duration-200  " +
              (open
                ? "bg-primary border-gray-700 fixed top-0 left-0 w-full"
                : "")
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
              enterFrom="translate-x-full -translate-y-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full -translate-y-full"
            >
              <Menu.Items
                as="div"
                className="z-50 px-6 text-center lg:text-lg font-medium text-white fixed left-0 bottom-0 top-16 w-screen bg-primary"
                // style={{ height: "calc(100vh - 64px)" }}
                static
              >
                <div className="flex flex-col justify-center items-center w-full -translate-y-1/4">
                  {!isLoading && data?.is_logged_in ? (
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
                              <span className="flex gap-2 items-center">
                                <DashboardIcon className="w-7" />
                                Dashboard
                              </span>
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
                              <span className="flex gap-2 items-center">
                                <TopWorkoutRoutinesIcon className="w-7" />
                                Top Workout Routines
                              </span>
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
                              <span className="flex gap-2 items-center">
                                <WorkoutIcon className="w-7" />
                                Manage Workouts
                              </span>
                              <ChevronRightIcon className="text-red-500 w-7" />
                            </div>
                          </div>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="/profile">
                          <div
                            className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${
                              route === "/profile"
                                ? "text-yellow-400 hover:text-yellow-400 cursor-default"
                                : ""
                            }`}
                          >
                            <div className="flex justify-between h-9">
                              <span className="flex gap-2 items-center">
                                <UserCircleIcon className="w-7" />
                                <span>Profile</span>
                              </span>
                              <ChevronRightIcon className="text-red-500 w-7" />
                            </div>
                          </div>
                        </Link>
                      </Menu.Item>
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
                              <div className="flex gap-2 items-center">
                                <AnalyticsIcon className="w-7 fill-white" />
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
                            <div className="flex justify-between h-9">
                              Logout
                            </div>
                          </div>
                        </Link>
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <>
                        <div
                          className={`w-full max-w-lg cursor-not-allowed py-2 my-2 rounded-lg ${
                            route === "/pricing"
                              ? "text-yellow-400 hover:text-yellow-400 cursor-default"
                              : ""
                          }`}
                        >
                          <div className="flex justify-between h-9">
                            <div className="space-x-2">
                              <span>Pricing</span>
                              <span className="badge text-xs badge-outline badge-warning">
                                free during beta ✨
                              </span>
                            </div>

                            <ChevronRightIcon className="text-red-500 w-7" />
                          </div>
                        </div>
                      </>
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
                </div>
              </Menu.Items>
            </Transition>
          </div>
        );
      }}
    </Menu>
  );
};
