import {
  ChevronRightIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useGetCurrentUserQuery } from "../api";
import { Logo } from "./Logo";
import { Menu, Transition } from "@headlessui/react";

export const Navbar = () => {
  const { isError, isLoading, data } = useGetCurrentUserQuery();
  const topLinkUrl = !isLoading && data?.is_logged_in ? "/dash" : "/";
  const { route } = useRouter();

  return (
    <Menu>
      {({ open }) => {
        if (typeof window !== "undefined") {
          // TODO: think of something more performant.
          if (open) document.body.classList.add("overflow-hidden");
          else document.body.classList.remove("overflow-hidden");
        }
        return (
          <div
            className={
              "navbar min-h-16 h-16 border-b z-50 transition-colors ease-in-out duration-200  " +
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
                            className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === "/dash"
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
                            className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === "/sessionSchema/top"
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
                            className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === "/workout"
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
                        <Link href='/profile'>
                          <div className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === '/profile' ? 'text-yellow-400 hover:text-yellow-400 cursor-default' : ''}`}>
                            <div className="flex justify-between h-9">
                              <span className="flex gap-2 items-center">
                                <UserCircleIcon className="w-7" />
                                <span>Profile</span>
                              </span>
                              <ChevronRightIcon className='text-red-500 w-7' />
                            </div>
                          </div>

                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="/insights">
                          <div
                            className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === "/insights"
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
                            className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === "/auth/logout"
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

                      <Menu.Item>
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
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="/auth/welcome">
                          <div
                            className={`w-full max-w-lg cursor-pointer py-2 my-2 hover:text-secondary rounded-lg ${route === "/auth/welcome"
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
        )

      }
      }
    </Menu>
  );
};


const CustomMenuIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path d="M3.5,6a1,1,0,1,0,1,1A1,1,0,0,0,3.5,6Zm4,2h14a1,1,0,0,0,0-2H7.5a1,1,0,0,0,0,2Zm0,3a1,1,0,1,0,1,1A1,1,0,0,0,7.5,11Zm4,5a1,1,0,1,0,1,1A1,1,0,0,0,11.5,16Zm10-5h-10a1,1,0,0,0,0,2h10a1,1,0,0,0,0-2Zm0,5h-6a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z" /></svg>
)



const CustomXIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 32 32"><path fill="#fff" d="M10.05 23.95a1 1 0 0 0 1.414 0L17 18.414l5.536 5.536a1 1 0 0 0 1.414-1.414L18.414 17l5.536-5.536a1 1 0 0 0-1.414-1.414L17 15.586l-5.536-5.536a1 1 0 0 0-1.414 1.414L15.586 17l-5.536 5.536a1 1 0 0 0 0 1.414z" /></svg>
)


const WorkoutIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 40 40" ><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#C1EC34" /><stop offset="100%" stop-color="#A2FC3C" /></linearGradient></defs><g fill="none" fill-rule="evenodd"><circle cx="20" cy="20" r="20" fill="currentColor" /><path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M15.299736,18.3881278 L16.0929506,13.3737601 L21.3533967,12.7493323 C22.0931205,13.0784758 22.4629824,13.2430475 22.4629824,13.2430475 C23.9906535,16.8619419 24.754489,18.6713891 24.754489,18.6713891 L29.007595,16.418353" /><polyline stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" points="12.273 31.274 16.575 26.556 18.551 20.146 20.497 20.554 25.308 24.69 19.719 28.446" /><path stroke="#000" stroke-width="4.5" d="M21.5899193,13.1733843 L19.4438056,20.6823994" /><circle cx="23" cy="8.75" r="2.25" fill="#000" /></g></svg>
)


const TopWorkoutRoutinesIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 48 48">
    <g transform="translate(0 -1004.362)">
      <circle cx={24} cy="1028.362" r={24} fill="currentColor" fillRule="evenodd" />
      <g transform="translate(254.09 -212.207)">
        <path
          fill="#000"
          fillRule="evenodd"
          d="m-225.303 1240.537 2.977 11.111a.499.499 0 0 1-.581.618l-1.904-.39a1.207 1.207 0 0 0-1.043.28l-1.45 1.286a.502.502 0 0 1-.819-.246l-2.975-11.106z"
        />
        <path
          fill="#000"
          fillRule="evenodd"
          d="m-229.969 1241.788-1.129.303 1.746 6.517 1.665-6.209-2.282-.611z"
        />
        <path
          fill="#000"
          d="m-223.232 1248.267-5.796 1.553.26.966 5.795-1.553zM-223.75 1246.336l-5.795 1.552.259.966 5.795-1.553z"
        />
        <rect
          width={3}
          height={1}
          x="816.715"
          y="957.654"
          fill="#f05542"
          rx=".5"
          ry=".5"
          transform="scale(-1 1) rotate(30)"
        />
        <path
          fill="#000"
          fillRule="evenodd"
          d="m-234.339 1240.537-2.977 11.111a.499.499 0 0 0 .582.618l1.904-.39c.372-.075.759.028 1.043.28l1.45 1.286c.279.247.721.115.818-.246l2.976-11.106z"
        />
        <path
          fill="#000"
          d="m-234.339 1240.538-.783 2.922c.938.797 1.036 2.292 2.233 2.645 1.243.366 2.153-.953 3.446-1.034h.1l.8-2.985-5.796-1.553z"
        />
        <path
          fill="#000"
          d="m-225.342 1240.393-5.795 1.553.897 3.346c.246-.1.499-.176.771-.193 1.318-.082 2.407 1.135 3.617.607.837-.365 1.029-1.251 1.38-2.066l-.87-3.247z"
        />
        <path
          fill="#000"
          d="M-224.569 1241.966c-.839.8-.705 2.227-1.767 2.69-1.062.464-2.017-.605-3.174-.533-1.156.073-1.971 1.252-3.083.925-1.111-.328-1.156-1.76-2.088-2.449-.933-.688-2.315-.308-2.956-1.273-.641-.965.246-2.092-.026-3.218-.272-1.127-1.576-1.724-1.446-2.876.13-1.151 1.533-1.444 2.049-2.482.515-1.038-.1-2.333.74-3.132.84-.799 2.103-.121 3.165-.585 1.062-.463 1.424-1.85 2.58-1.923 1.157-.072 1.69 1.26 2.801 1.587 1.111.327 2.28-.503 3.213.185.932.688.484 2.05 1.125 3.016.641.965 2.07 1.08 2.342 2.207.273 1.126-.946 1.882-1.076 3.033-.13 1.152.891 2.16.376 3.197-.516 1.037-1.935.833-2.775 1.631z"
        />
        <path
          fill="#000"
          d="M-225.757 1240.717c-.66.628-.555 1.75-1.389 2.114-.834.364-1.585-.476-2.494-.42-.908.057-1.549.985-2.422.727-.873-.257-.909-1.383-1.641-1.924-.733-.54-1.82-.242-2.323-1-.503-.759.194-1.644-.02-2.529s-1.238-1.354-1.136-2.26c.102-.904 1.204-1.134 1.61-1.95.405-.815-.078-1.833.581-2.46.66-.628 1.653-.095 2.487-.46.835-.364 1.12-1.454 2.028-1.51.908-.057 1.327.989 2.2 1.246.873.257 1.792-.395 2.525.146.732.54.38 1.61.884 2.369.503.758 1.626.85 1.84 1.734.214.885-.744 1.479-.846 2.383-.101.905.7 1.697.295 2.512-.405.815-1.52.654-2.18 1.282zM-236.41 1248.267l5.796 1.553-.26.966-5.795-1.553zM-235.892 1246.335l5.795 1.553-.258.966-5.796-1.553z"
        />
        <g style={{ lineHeight: "125%" }}>
          <path
            fill="currentColor"
            d="M-229 1233.363a.061.061 0 0 1-.016-.029c-.002-.01-.003-.022-.002-.036l-.005-.02a.128.128 0 0 1-.005-.027c-.004 0-.007-.01-.01-.02-.001-.01-.004-.017-.008-.027a.04.04 0 0 0-.006-.023c-.004-.01-.008-.014-.013-.023 0 0-.002-.01-.005-.013-.003 0-.004-.01-.005-.014 0-.001-.002 0-.005-.01s-.004-.01-.005-.01c-.005 0-.011-.011-.019-.02-.007-.01-.013-.013-.018-.018a.126.126 0 0 0-.028-.037c-.004-.01-.01-.011-.015-.02a.05.05 0 0 0-.022-.018c-.005 0-.012-.01-.019-.014-.007 0-.014-.01-.019-.014a.15.15 0 0 1-.037-.028c-.009 0-.017 0-.024-.01-.008 0-.018-.012-.032-.021-.005 0-.01-.01-.018-.01h-.019c-.009 0-.017-.01-.024-.013-.008 0-.018-.01-.032-.01h-.018c-.007-.001-.014 0-.019-.01h-.135c-.012 0-.023 0-.033.01h-.018c-.007 0-.014 0-.019.01h-.056c-.009.01-.017.01-.023.017-.007.01-.014.01-.023.01-.005 0-.011.01-.019.01-.007 0-.013.01-.018.01l-1.144.678a.5.5 0 0 0-.234.314.477.477 0 0 0 .067.384c.047.084.11.148.187.193.077.045.16.067.25.067.042 0 .085 0 .13-.016a.439.439 0 0 0 .13-.058l.372-.214v4.574a.508.508 0 0 0 .147.364.51.51 0 0 0 .364.148.51.51 0 0 0 .365-.148.502.502 0 0 0 .156-.364v-5.513z"
            fontFamily="Quicksand"
            fontSize="90.298"
            fontWeight={1000}
            letterSpacing={0}
            wordSpacing={0}
          />
        </g>
        <rect
          width={3}
          height={1}
          x={-231}
          y="1238.389"
          fill="currentColor"
          rx=".5"
          ry=".5"
        />
      </g>
    </g>
  </svg>

)


const DashboardIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path fill="currentColor" d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" /></svg>
)


const AnalyticsIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24"><path fill="currentColor" d="M7,16a1.5,1.5,0,0,0,1.5-1.5.77.77,0,0,0,0-.15l2.79-2.79.23,0,.23,0,1.61,1.61s0,.05,0,.08a1.5,1.5,0,1,0,3,0v-.08L20,9.5h0A1.5,1.5,0,1,0,18.5,8a.77.77,0,0,0,0,.15l-3.61,3.61h-.16L13,10a1.49,1.49,0,0,0-3,0L7,13H7a1.5,1.5,0,0,0,0,3Zm13.5,4H3.5V3a1,1,0,0,0-2,0V21a1,1,0,0,0,1,1h18a1,1,0,0,0,0-2Z" /></svg>
)
