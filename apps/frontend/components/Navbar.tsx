import { MenuAlt1Icon, MenuIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useGetCurrentUserQuery } from '../api'
import { Logo } from './Logo'



export const Navbar = () => {
    const { isError, isLoading } = useGetCurrentUserQuery()
    const topLinkUrl = (!isLoading && !isError) ? '/dash' : '/'

    const { route } = useRouter()

    return (
        <div className="navbar min-h-12 h-12   border-b">
            <div className="flex-1 h-full">
                <Link href={topLinkUrl}>
                    <div className=' btn btn-ghost normal-case text-base'>
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
                                <li className={route === '/dash' ? 'bg-base-300' : ''}>
                                    <Link href='/dash'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className={route === '/sessionSchema/top' ? 'bg-base-300' : ''}>
                                    <Link href='/sessionSchema/top'>
                                        Top Workout Routines
                                    </Link>
                                </li>
                                {/* <li className={route==='/workout'?'bg-base-300':''}>
                                // TODO: Enable it when you've added support for workout notes; and don't allow change the name or anything once created
                                // the user can delete it only if the workout isn't public (i.e. the workout isn't part of any public schema) and it isn't getting used by any workout (owned by user)
                                    <Link href='/workout'>
                                        Manage Workouts 
                                    </Link>
                                </li> */}
                                <li className={route === '/profile' ? 'bg-base-300' : ''}>
                                    <Link href='/profile'>
                                        Profile
                                    </Link>
                                </li>
                                <li className={route === '/insights' ? 'bg-base-300' : ''}>
                                    <Link href='/insights'>
                                        <div className="justify-between">
                                            Insights
                                            <span className="badge">New</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={route === '/auth/logout' ? 'bg-base-300' : ''}>
                                    <Link href='/auth/logout'>
                                        Logout
                                    </Link>
                                </li>

                            </> : <>
                                <li className={route === '/about-us' ? 'bg-base-300' : ''}>
                                    <Link href='/about-us'>
                                        About Us
                                    </Link>
                                </li>

                                <li className={route === '/pricing' ? 'bg-base-300' : ''}>
                                    <Link href='/pricing'>
                                        Pricing
                                    </Link>
                                </li>
                                <li className={route === '/auth/signin' ? 'bg-base-300' : ''}>
                                    <Link href='/auth/signin'>
                                        Sign In
                                    </Link>
                                </li>
                                <li className={route === '/auth/signup' ? 'bg-base-300' : ''}>
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
