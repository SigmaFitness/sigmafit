import { MenuAlt1Icon, MenuIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { useGetCurrentUserQuery } from '../api'
import { Logo } from './Logo'



export const Navbar = () => {

    const { isError, isLoading } = useGetCurrentUserQuery()

    return (
        <div className="navbar min-h-12 h-12">
            <div className="flex-1">
                <Link href='/'>
                    <div className='mt-2 btn btn-ghost normal-case text-base'>
                        {/* <Image src={require('../public/assets/SigmaFit-logo.svg')} /> */}
                        <Logo className='w-36' />
                    </div>
                </Link>
            </div>


            <div className="flex-none">
                <div className="dropdown dropdown-end md:dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="rounded-full">
                            <MenuIcon className='w-8' />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
                    >

                        {!isLoading && !isError ?

                            <>

                                <li>
                                    <Link href='/dash'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/workout'>
                                        Explore Workouts
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/profile'>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/insights'>
                                        <div className="justify-between">
                                            Insights
                                            <span className="badge">New</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/auth/logout'>
                                        Logout
                                    </Link>
                                </li>

                            </> : <>
                                <li>
                                    <Link href='/about-us'>
                                        About Us
                                    </Link>
                                </li>

                                <li>
                                    <Link href='/pricing'>
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href='/auth/signin'>
                                        Sign In
                                    </Link>
                                </li>
                                <li>
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
