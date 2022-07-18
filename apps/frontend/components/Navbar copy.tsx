import { ArrowRightIcon, ChevronRightIcon, MenuAlt1Icon, MenuIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useGetCurrentUserQuery } from '../api'
import { Logo } from './Logo'
import { Menu } from '@headlessui/react'


export const Navbar = () => {
    const { isError, isLoading } = useGetCurrentUserQuery()
    const topLinkUrl = (!isLoading && !isError) ? '/dash' : '/'
    const [isOpen, setIsOpen] = useState(false)
    const { route } = useRouter()

    return (
        <div className={"navbar min-h-12 h-12 border-b " + (isOpen ? 'bg-primary' : '')}>
            <div className="flex-1 h-full">
                <Link href={topLinkUrl}>
                    <div className='btn btn-ghost normal-case text-base'>
                        {/* <Image src={require('../public/assets/SigmaFit-logo.svg')} /> */}
                        <Logo className={'w-36 ' + (isOpen ? 'text-white' : 'text-black')} />
                    </div>
                </Link>
            </div>

            <Menu>

                <Menu.Button className='btn btn-circle'>Hit<MenuIcon className='w-8' /></Menu.Button>


                <Menu.Items>
                    <Menu.Item>
                        <Link href='/dash'>
                            <div className="flex justify-between h-9">Dashboard
                                <ChevronRightIcon className='text-red-400 w-7' />
                            </div>
                        </Link>
                    </Menu.Item>

                </Menu.Items>
            </Menu>
            <div className="flex-none">
                <div className="dropdown dropdown-end md:dropdown">
                    {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="rounded-full">
                            <MenuIcon className='w-8' />
                        </div>
                    </label> */}
                    <ul
                        tabIndex={0}
                        className="menu menu-compact mt-12 dropdown-content -mr-2 p-2 shadow bg-primary text-white w-screen px-7 fixed top-0 sf-navbar-dropdown"
                        style={{ height: 'calc(100vh - 48px)' }}
                    >

                        {!isLoading && !isError ?

                            <>
                                <li className={route === '/dash' ? 'bg-base-300 rounded-lg' : ''}>

                                </li>
                                <li className={route === '/sessionSchema/top' ? 'bg-base-300 rounded-lg' : ''}>
                                    <Link href='/sessionSchema/top'>
                                        <div className="flex justify-between h-9">
                                            Top Workout Routines
                                            <ChevronRightIcon className='text-red-400 w-7' />
                                        </div>
                                    </Link>
                                </li>
                                <li className={route === '/workout' ? 'bg-base-300' : ''}>
                                    <Link href='/workout'>
                                        <div className="flex justify-between h-9">
                                            Manage Workouts
                                            <ChevronRightIcon className='text-red-400 w-7' />
                                        </div>
                                    </Link>
                                </li>
                                <li className={route === '/profile' ? 'bg-base-300 rounded-lg' : ''}>
                                    <Link href='/profile'>
                                        <div className="flex justify-between h-9">
                                            Profile
                                        </div>
                                    </Link>
                                </li>
                                <li className={route === '/insights' ? 'bg-base-300 rounded-lg' : ''}>
                                    <Link href='/insights'>
                                        <div className="flex justify-between h-9">
                                            <div className="space-x-2">
                                                <span>Training Insights</span>
                                                <span className="badge badge-sm badge-warning">New</span>
                                            </div>
                                        </div>

                                    </Link>
                                </li>
                                <li className={route === '/auth/logout' ? 'bg-base-300 rounded-lg' : ''}>
                                    <Link href='/auth/logout'>
                                        Logout
                                    </Link>
                                </li>

                            </> : <>
                                <li className={route === '/about-us' ? 'bg-base-300 rounded-lg' : ''}>
                                    <Link href='/about-us'>
                                        About Us
                                    </Link>
                                </li>

                                <li className={route === '/pricing' ? 'bg-base-300 rounded-lg' : ''}>
                                    <Link href='/pricing'>
                                        Pricing
                                    </Link>
                                </li>
                                <li className={route === '/auth/signin' ? 'bg-base-300 rounded-lg' : ''}>
                                    <Link href='/auth/signin'>
                                        Sign In
                                    </Link>
                                </li>
                                <li className={route === '/auth/signup' ? 'bg-base-300 rounded-lg' : ''}>
                                    <Link href='/auth/signup'>
                                        Sign Up
                                    </Link>
                                </li>
                            </>}

                    </ul>
                </div>
            </div>
        </div>

    )
}
